import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { db, auth, googleProvider, OWNER_UID } from "@/lib/firebase";

/**
 * Habit tracker — GitHub-style contribution grid.
 *
 * Data model (Firestore):
 *   collection "habitDays" → one doc per day, id = "YYYY-MM-DD"
 *   each doc: { [habitId]: number }   e.g. { study: 2, gym: 1 }
 *   the number is the intensity for that habit on that day (0–4).
 *
 * Only OWNER_UID can write (enforced by Firestore rules). Everyone can read.
 */

// ---- Configure your habits here ----
const HABITS = [
  { id: "study", label: "Study / Scripting", color: "var(--color-cyan)" },
  { id: "research", label: "Lab / Research", color: "var(--color-violet)" },
  { id: "writing", label: "Writing", color: "var(--color-amber)" },
] as const;

type HabitId = (typeof HABITS)[number]["id"];
type DayData = Partial<Record<HabitId, number>>;
type AllData = Record<string, DayData>; // key = "YYYY-MM-DD"

const MAX_INTENSITY = 4;

function toKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Build the last 53 weeks of days, aligned to weeks (Sun–Sat columns)
function buildCalendar(): Date[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  // walk back ~371 days then forward to fill whole weeks
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  // back up to the previous Sunday
  start.setDate(start.getDate() - start.getDay());

  const weeks: Date[][] = [];
  let cursor = new Date(start);
  while (cursor <= end) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export default function HabitTracker() {
  const [data, setData] = useState<AllData>({});
  const [user, setUser] = useState<User | null>(null);
  const [activeHabit, setActiveHabit] = useState<HabitId>(HABITS[0].id);

  const weeks = useMemo(buildCalendar, []);
  const today = useMemo(() => toKey(new Date()), []);

  const isOwner = !!user && OWNER_UID !== "" && user.uid === OWNER_UID;

  // Live-subscribe to all habit days
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "habitDays"), (snap) => {
      const next: AllData = {};
      snap.forEach((d) => {
        next[d.id] = d.data() as DayData;
      });
      setData(next);
    });
    return unsub;
  }, []);

  // Track auth state
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Print your UID so you can copy it into OWNER_UID + Firestore rules
        console.log("Signed in. Your Firebase UID is:", u.uid);
      }
    });
  }, []);

  async function cycleDay(dateKey: string) {
    if (!isOwner) return;
    const current = data[dateKey]?.[activeHabit] ?? 0;
    const nextVal = (current + 1) % (MAX_INTENSITY + 1); // 0→1→2→3→4→0
    const ref = doc(db, "habitDays", dateKey);
    try {
      if (nextVal === 0) {
        // remove just this habit's field; leave other habits intact
        await updateDoc(ref, { [activeHabit]: deleteField() }).catch(
          async () => {
            await setDoc(ref, {}, { merge: true });
          }
        );
      } else {
        await setDoc(ref, { [activeHabit]: nextVal }, { merge: true });
      }
    } catch (e) {
      console.error("Write failed:", e);
    }
  }

  const activeColor =
    HABITS.find((h) => h.id === activeHabit)?.color ?? "var(--color-cyan)";

  function cellStyle(dateKey: string): React.CSSProperties {
    const val = data[dateKey]?.[activeHabit] ?? 0;
    if (val <= 0) {
      return { backgroundColor: "hsl(var(--border))" };
    }
    const opacity = 0.25 + (val / MAX_INTENSITY) * 0.75; // 0.25–1.0
    return { backgroundColor: activeColor, opacity };
  }

  const monthLabels = useMemo(() => {
    const labels: { col: number; name: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const m = week[0].getMonth();
      if (m !== lastMonth) {
        labels.push({
          col: i,
          name: week[0].toLocaleString("en-US", { month: "short" }),
        });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <section id="tracker" className="py-24 md:py-32 scroll-mt-16">
      <div className="section-label">05 / Consistency</div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-display font-medium text-foreground">
            Daily Discipline
          </h3>

          {/* Habit selector */}
          <div className="flex flex-wrap gap-2">
            {HABITS.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHabit(h.id)}
                className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded border transition-colors ${
                  activeHabit === h.id
                    ? "border-foreground text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-sm mr-2 align-middle"
                  style={{ backgroundColor: h.color }}
                />
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* The grid */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-block min-w-full">
            {/* Month labels */}
            <div className="flex gap-1 mb-1 ml-1 text-muted-foreground font-mono text-[10px]">
              {weeks.map((_, i) => {
                const label = monthLabels.find((m) => m.col === i);
                return (
                  <div key={i} className="w-3" style={{ minWidth: "0.75rem" }}>
                    {label ? label.name : ""}
                  </div>
                );
              })}
            </div>

            {/* Weeks as columns */}
            <div className="flex gap-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day) => {
                    const key = toKey(day);
                    const future = key > today;
                    return (
                      <div
                        key={key}
                        onClick={() => !future && cycleDay(key)}
                        title={`${key}${
                          data[key]?.[activeHabit]
                            ? ` · level ${data[key][activeHabit]}`
                            : ""
                        }`}
                        className={`w-3 h-3 rounded-sm ${
                          isOwner && !future ? "cursor-pointer" : ""
                        } ${future ? "opacity-20" : ""}`}
                        style={future ? undefined : cellStyle(key)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend + owner controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className="w-3 h-3 rounded-sm"
                style={
                  lvl === 0
                    ? { backgroundColor: "hsl(var(--border))" }
                    : {
                        backgroundColor: activeColor,
                        opacity: 0.25 + (lvl / MAX_INTENSITY) * 0.75,
                      }
                }
              />
            ))}
            <span>More</span>
          </div>

          <div className="font-mono text-[10px]">
            {!user && (
              <button
                onClick={() => signInWithPopup(auth, googleProvider)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                sign in
              </button>
            )}
            {user && !isOwner && (
              <span className="text-muted-foreground">
                view only{" "}
                <button
                  onClick={() => signOut(auth)}
                  className="hover:text-foreground underline"
                >
                  (sign out)
                </button>
              </span>
            )}
            {isOwner && (
              <span className="text-cyan">
                editing · click a day to cycle intensity{" "}
                <button
                  onClick={() => signOut(auth)}
                  className="text-muted-foreground hover:text-foreground underline ml-2"
                >
                  sign out
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
