import { type FunctionalComponent } from "preact";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { HeroSection } from "./HeroSection";

const HomePage: FunctionalComponent = () => (
  <>
    <HeroSection />
    <ExperienceTimeline />
  </>
);

export default HomePage;
