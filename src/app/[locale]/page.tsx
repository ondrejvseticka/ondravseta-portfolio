import { Capabilities } from "@/components/capabilities/Capabilities";
import { Footer } from "@/components/layout/Footer";
import { TechStack } from "@/components/stack/TechStack";
import { Hero } from "@/components/hero/Hero";
import { Process } from "@/components/process/Process";
import { Profile } from "@/components/profile/Profile";
import { WorkCarousel } from "@/components/work/WorkCarousel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStack />
      <WorkCarousel />
      <Capabilities />
      <Process />
      <Profile />
      <Footer />
    </>
  );
}
