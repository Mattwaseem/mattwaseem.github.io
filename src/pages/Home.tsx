import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";
import HabitTracker from "@/components/HabitTracker";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div className="relative w-full">
      <Nav />
      <main className="mx-auto max-w-[1100px] px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Experience />
        <HabitTracker />
        <Gallery />
        <Projects />
        <Writing />
      </main>
      <Footer />
    </div>
  );
}
