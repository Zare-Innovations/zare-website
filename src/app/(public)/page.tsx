import { Stack } from '@mantine/core';
import Hero from './_components/hero';
import Empowering from './_components/empowering';
import Promise from './_components/promise';
import Services from './_components/services';
import Testimonials from "./_components/testimonials";
import Works from './_components/works';
import Companies from './_components/companies';
import CalculatorSection from './_components/calculator-section';
import ProjectsOverview from "./_components/projects-overview";
import Jobs from "./_components/jobs";
import Contact from './_components/contact';

export default function Home() {
  return (
    <Stack>
      <Hero />
      <Companies />
      <Empowering />
      <Promise />
      <ProjectsOverview />
      <Services />
      <Testimonials />
      <Works />
      <CalculatorSection />
      <Jobs />
      <Contact />
    </Stack>
  );
}
