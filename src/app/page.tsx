import { Stack } from "@mantine/core";
import Hero from "./_components/hero";
import Empowering from "./_components/empowering";
import Promise from "./_components/promise";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials";
import Contact from "./_components/contact";
import Works from "./_components/works";

export default function Home() {
  return (
    <Stack>
      <Hero />
      <Empowering/>
      <Promise/>
      <Services/>
      <Testimonials/>
      <Works/>
      <Contact/>
    </Stack>
  );
}
