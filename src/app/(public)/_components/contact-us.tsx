'use client';
import useContactForm from '@/hooks/useForm';
import { Button, Flex, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandLinkedin,
  IconMail,
  IconMapPinFilled,
  IconPhoneCall,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ContactUsForm() {
  const [opened, { open, close }] = useDisclosure(false);
  const { loading, formData, formErrors, handleChange, handleSendEmail } =
    useContactForm();

  return (
    <Stack>
      <Modal
        opened={opened}
        onClose={close}
        size={2000}
        withCloseButton={true}
        closeButtonProps={{
          style: {
            margin: '3px 4px 3px auto',
          },
          className: 'bg-cyan-600/20 hover:bg-cyan-600/30 transition-all duration-300'
        }}
      >
        <Flex className="flex-col md:flex-row">
          <Flex className="text-white bg-[#0a293b] outline flex-col gap-4 max-[500px]:gap-8 sm:gap-12 rounded-md p-5 sm:p-8  px-5 sm:px-10 w-full lg:w-3/5 relative overflow-hidden">
            <div className="absolute bottom-12 right-10 rounded-full bg-white opacity-[12%] w-[148px] h-[148px]"></div>
            <div className="absolute -bottom-32 -right-36 rounded-full bg-white opacity-[12%] w-[288px] h-[288px]"></div>

            <Flex className="flex-col gap-0.5 sm:gap-2">
              <p className="font-bold text-xl">Contact Us</p>
              <p className="font-light text-gray-300">
                Reach out to work with us or just say hello :)
              </p>
            </Flex>
            <Flex className="flex-col gap-5 max-[500px]:gap-8 sm:gap-12">
              <Flex className="flex gap-4">
                <IconPhoneCall className="w-6 h-6" />

                <Flex className="gap-6">
                  <Flex className=" gap-2 flex-col">
                    <p className="text-lg font-semibold">USA</p>
                    <p className="text-sm">+1 703 395 5235</p>
                  </Flex>
                  <Flex className="gap-2 flex-col">
                    <p className="text-lg font-semibold">Ethiopia</p>
                    <p className="text-sm">+251 93 816 9380</p>
                  </Flex>
                </Flex>
              </Flex>
              <Flex className="flex gap-2 flex-col">
                <Link
                  href={'mailto:careers@zareinnovations.com'}
                  className="flex gap-4 items-center"
                >
                  <IconMail className="h-6 w-6" />
                  <span className="underline">info@zareinnovations.com</span>
                </Link>
              </Flex>
              <Flex className="gap-4">
                <IconMapPinFilled className="w-8 h-8" />
                <Flex className="flex gap-1 sm:gap-2 flex-col">
                  <p className="text-lg font-semibold">USA</p>
                  <Flex className="gap-2 text-sm">
                    651 N Broad St, Suite 201, Middletown, Delaware, 19709,
                    United States
                  </Flex>
                  <p className="text-lg font-semibold">Ethiopia</p>
                  <Flex className="gap-2 text-sm z-10">
                    Meskel Flower, Aster Plaza 3rd Floor, Addis Ababa, Ethiopia
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex className="flex border-t border-cyan-400/30 pt-3">
              <Link
                className="rounded-full p-2 bg-[#00A9AB] hover:bg-white hover:text-cyan-600 transition-all duration-300"
                href="https://www.linkedin.com/company/zare-innovations"
              >
                <IconBrandLinkedin />
              </Link>
            </Flex>
          </Flex>

          <Flex className="w-full flex-col gap-5 sm:gap-8 p-3 md:p-8">
            <Image
              src={'/zare-logo.svg'}
              width={100}
              height={100}
              alt="Zare logo"
              className="ml-auto"
            />
            <Flex className="flex gap-3 max-[500px]:gap-5 sm:gap-8 flex-col md:flex-row">
              <div className="md:w-1/2 flex flex-col gap-2">
                <TextInput
                  onChange={handleChange}
                  name="firstName"
                  label="First Name"
                  value={formData['firstName']}
                  placeholder="Enter first name"
                />
                {formErrors?.['firstName'] && (
                  <span className="text-red-400 text-sm">
                    {formErrors?.['firstName']}
                  </span>
                )}
              </div>
              <div className="md:w-1/2 flex flex-col gap-2">
                <TextInput
                  onChange={handleChange}
                  value={formData['lastName']}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                />
                {formErrors?.['lastName'] && (
                  <span className="text-red-400 text-sm">
                    {formErrors?.['lastName']}
                  </span>
                )}
              </div>
            </Flex>
            <Flex className="flex flex-col md:flex-row gap-3 max-[500px]:gap-5 sm:gap-8">
              <div className="md:w-1/2 flex flex-col gap-2">
                <TextInput
                  onChange={handleChange}
                  value={formData['email']}
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                />
                {formErrors?.['email'] && (
                  <span className="text-red-400 text-sm">
                    {formErrors?.['email']}
                  </span>
                )}
              </div>

              <div className="md:w-1/2 flex flex-col gap-2">
                <TextInput
                  onChange={handleChange}
                  value={formData['phoneNumber']}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                />
                {formErrors?.['phoneNumber'] && (
                  <span className="text-red-400 text-sm">
                    {formErrors?.['phoneNumber']}
                  </span>
                )}
              </div>
            </Flex>

            <div className="flex flex-col gap-2">
              <Textarea
                minRows={6}
                value={formData['message']}
                onChange={handleChange}
                autosize={true}
                label="Message"
                name="message"
                placeholder="Enter your message here"
              />
              {formErrors?.['message'] && (
                <span className="text-red-400 text-sm">
                  {formErrors?.['message']}
                </span>
              )}
            </div>
            <Button
              size="md"
              className="ml-auto"
              onClick={handleSendEmail}
              disabled={loading}
            >
              Send Message
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Button className="w-fit" size="lg" onClick={open}>
        Contact Us
      </Button>
    </Stack>
  );
}
