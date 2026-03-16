import { h, Fragment, FunctionalComponent } from 'preact';

import { HeroSection } from './HeroSection';
import { ExperienceTimeline } from './ExperienceTimeline';

const HomePage: FunctionalComponent = () => (
    <Fragment>
        <HeroSection />
        <ExperienceTimeline />
    </Fragment>
);

export default HomePage;
