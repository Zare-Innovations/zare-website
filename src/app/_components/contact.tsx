import { Flex, Stack } from '@mantine/core';
import Map from './map.png';
import ContactUsForm from './contact-us';

export default function Contact() {
  return (
    <div className="bg-white py-8">
      <Stack
        id="contact-us"
        className="lg:h-[65dvh] py-8 flex items-center justify-center gap-4"
        style={{
          backgroundImage: `url(${Map.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <Flex className="px-5 flex-col gap-12 my-auto ">
          <p className="text-4xl md:text-6xl text-center lg:w-[70%] mx-auto font-bold">
            Revolutionize Your Business with
            <span className="text-[#00A9AB]"> Zare Innovations.</span>
          </p>
          <p className="text-center">
            Elevate your business with our diverse BPO services tailored to
            perfection – where quality meets affordability.
          </p>
          <div className="mx-auto">
            <ContactUsForm />
          </div>
        </Flex>
      </Stack>
    </div>
  );
}
