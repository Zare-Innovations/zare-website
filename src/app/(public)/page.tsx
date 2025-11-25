import { Stack } from '@mantine/core';
// import Hero from './_components/hero';
// import Empowering from './_components/empowering';
// import Promise from './_components/promise';
// import Services from './_components/services';
// import Testimonials from './_components/testimonials';
// import Contact from './_components/contact';
// import Works from './_components/works';
import Companies from './_components/companies';
// import CalculatorSection from './_components/calculator-section';
import HeroWeb from './_components/heroWeb';
import Empower from './_components/empower';
import ProjectsShowcase from './_components/projectsShowcase';
import { ServicesSection } from './_components/servicesSection';
import TestimonialSliderText from './_components/testimonialsText';

import AlternatingProjectList from './_components/alternatingProjectList';
import { LandingJobs } from './_components/landingJobs';
import RoiNudge from './_components/roiNudge';
import Booking from './_components/booking';


export default function Home() {
  return (
    <Stack >
      <div className='px-4 lg:px-24'>
      <HeroWeb/>
      <Companies />
      <Empower />
      <ProjectsShowcase/>
      <ServicesSection/>
      {/* <Testimonials /> */}
      <TestimonialSliderText/>
      <AlternatingProjectList/>
      {/* <Works /> */}
      <RoiNudge/>
      <LandingJobs/>
</div>
      <Booking/>
      {/* <CalculatorSection /> */}
      {/* <Contact /> */}
    </Stack>
  );
}
