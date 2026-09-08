import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { BentoGrid } from "@/components/skills/BentoGrid";
import { Services } from "@/components/services/Services";
import { Projects } from "@/components/work/Projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <Projects />
      <Services />
      <Footer />
    </>
  );
}
