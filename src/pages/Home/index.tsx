import { type FunctionalComponent } from "preact";

import { Competences } from "./Competences";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { HeroSection } from "./HeroSection";
import { MoreInfo } from "./MoreInfo";

const HomePage: FunctionalComponent = () => (
  <>
    <HeroSection />
    <ExperienceTimeline />
    <Competences />
    <MoreInfo />
  </>
);

export default HomePage;
