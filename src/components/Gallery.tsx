import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Photo carousel — static images served from /public/photos/.
 * No database: add a file to public/photos/, then add an entry to PHOTOS below.
 */

type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

// ---- Add your photos here ----
// Drop the file in public/photos/, then reference it as "/photos/filename.jpg"
const PHOTOS: Photo[] = [
  {
    src: "/photos/profile.jpg",
    alt: "Matt Waseem",
    caption: "",
  },
  {
    src: "/photos/graduation_dinner.jpg",
    alt: "Graduation dinner",
    caption: "Master's graduation — UC Berkeley",
  },
  {
    src: "/photos/oaxaca.png",
    alt: "Field research in Oaxaca, Mexico",
    caption: "Public health field work — Oaxaca, Mexico",
  },
];

const AUTO_ADVANCE_MS = 6000; // set to 0 to disable auto-advance

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const count = PHOTOS.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Gentle auto-advance, pausable by hover (handled via state below)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (AUTO_ADVANCE_MS <= 0 || paused || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <section id="gallery" className="py-24 md:py-32 scroll-mt-16">
      <div className="section-label">06 / Gallery</div>

      <div
        className="relative bg-card border border-border rounded-2xl overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        <div className="relative aspect-[16/10] md:aspect-[2/1] w-full">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Caption overlay */}
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6 pt-16">
                  <p className="font-mono text-xs md:text-sm text-foreground">
                    {photo.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 border border-border flex items-center justify-center text-foreground hover:text-cyan hover:border-cyan transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 border border-border flex items-center justify-center text-foreground hover:text-cyan hover:border-cyan transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-cyan"
                    : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
