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
          <p className="text-4xl md:text-5xl text-center lg:w-[60%] mx-auto font-bold tracking-tight">
  Ready to <span className="text-[#00A9AB]">Partner</span> With Us?
</p>
<p className="text-center text-gray-600 max-w-2xl mx-auto">
  Discover the impact of tailored BPO services. Reach out today and let’s 
  find the perfect solution for your business growth.
</p>
          <div className="mx-auto">
            <ContactUsForm />
          </div>
        </Flex>
      </Stack>
    </div>
  );
}
