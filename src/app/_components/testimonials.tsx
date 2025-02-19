import { Divider, Flex, Stack } from "@mantine/core";
import Image from "next/image";

const testmonialsData = [
  {
    logo: "/testimonials/pickrell.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "white",
    textColor: "black",
  },
  {
    logo: "/testimonials/ubutix.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "#0a293b",
    textColor: "white",
  },
  {
    logo: "/testimonials/exelia.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "#c2410c",
    textColor: "white",
  },
  {
    logo: "/testimonials/keysquare.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "#137bb3",
    textColor: "white",
  },
  {
    logo: "/testimonials/afig.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "#d97706",
    textColor: "white",
  },
  {
    logo: "/testimonials/medrafa.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "#d1fae5",
    textColor: "black",
  },
];

export default function Testimonials() {
  return (
    <Stack className="items-center p-12">
      <Flex className="flex-col gap-2 mx-auto">
        <p className="text-center font-bold text-2xl">Testimonials</p>
        <p className="font-semibold">What Our Clients Say About Us</p>
        <Divider size="sm" className="w-full" color="cyan" />
      </Flex>
      <Flex className="flex-wrap gap-20 mt-6 ">
        {testmonialsData?.slice(1, 3).map((testimonial, index) => (
          <Flex
            key={index}
            className={`rounded-lg gap-12 bg-[${testimonial.backgroundColor}] w-[calc(50%-3rem)] flex-col text-${testimonial?.textColor} p-8`}
            style={{ backgroundColor: testimonial?.backgroundColor }}
          >
            <Flex className="justify-between items-center">
              <Image
                alt="logo-1"
                src={testimonial.logo}
                width={200}
                height={100}
                className="w-40"
                unoptimized
              />
              <Image
                src={"/testimonials/quote-mark.png"}
                height={200}
                width={150}
                alt="logo-2"
                className="w-40"
                unoptimized
              />
            </Flex>
            <p>{testimonial.description}</p>
          </Flex>
        ))}
        {/* <Flex className="rounded-lg gap-8 bg-[#0A293B] w-1/3 flex-col text-white p-8">
          <Flex className="justify-between items-center">
            <Image
              alt="logo-2"
              src={"/testimonials/ubutix.png"}
              width={200}
              height={100}
              className="w-1/3"
              unoptimized
            />
            <Image
              src={"/testimonials/quote-mark.png"}
              height={200}
              width={150}
              alt="logo-2"
              className="w-1/3"
              unoptimized
            />
          </Flex>
          <p>
          {testmonialsData[1].description}
          </p>
        </Flex> */}
      </Flex>
    </Stack>
  );
}
