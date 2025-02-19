import { Button, Flex, Stack } from "@mantine/core";
import React from "react";
import Map from "./map.png";

export default function Contact() {
  return (
    <Stack
      className="h-[60dvh] flex items-center justify-center gap-4"
      style={{
        backgroundImage: `url(${Map.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Flex className="flex-col gap-4 my-auto">
        <p className="text-6xl text-center w-[70%] mx-auto">
          Revolutionize Your Business with
          <span className="text-cyan-400"> Zare Innovations.</span>
        </p>
        <p className="text-center">
          Elevate your business with our diverse BPO services tailored to
          perfection – where quality meets affordability.
        </p>
        <Button className="w-fit mx-auto" size="lg">Contact Us</Button>
      </Flex>
    </Stack>
  );
}
