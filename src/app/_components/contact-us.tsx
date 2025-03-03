'use client';
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandTwitter,
  IconMapPinFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ContactUsForm() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack>
      <Modal
        opened={opened}
        onClose={close}
        size={2000}
        withCloseButton={false}
      >
        <Flex>
          <Flex className="text-white bg-[#0a293b] w-1/2 flex-col gap-12 rounded-md p-8">
            <Flex className="flex-col">
              <p className="font-bold text-xl">Contact Us</p>
              <p>Reach out to work with us or just say hello </p>
            </Flex>
            <Flex className="flex-col gap-12">
              <Flex className="flex gap-2 flex-col">
                <Flex className="gap-4">
                  <Flex className="w-1/2 gap-2 flex-col">
                    <p className="text-lg font-semibold">USA</p>
                    <p>+1 703 395 5235</p>
                    <p>+1 703 395 5235</p>
                  </Flex>
                  <Flex className="w-1/2 gap-2 flex-col">
                    <p className="text-lg font-semibold">Ethiopia</p>
                    <p>+251 93 816 9380</p>
                    <p>+251 93 215 2547</p>
                  </Flex>
                </Flex>
              </Flex>
              <Flex className="flex gap-2 flex-col">
                <Link href={'mailto:careers@zareinnovations.com'}>
                  info@zareinnovations.com
                </Link>
              </Flex>
              <Flex className="flex gap-2 flex-col">
                <p className="text-lg font-semibold">USA</p>
                <Flex className="gap-2">
                  <IconMapPinFilled />
                  5501 Seminary Road, Falls Church VA, 22041,Unit 1710 South,
                  22041, United States
                </Flex>
                <p className="text-lg font-semibold">Ethiopia</p>
                <Flex className="gap-2">
                  <IconMapPinFilled />5 Meskel Flower, Aster Plaza 3rd
                  Floor,Addis Ababa, Ethiopia
                </Flex>
              </Flex>
            </Flex>
            <Flex className="flex gap-4">
              <ActionIcon variant="subtle" color="cyan">
                <IconBrandTwitter />
              </ActionIcon>
              <ActionIcon variant="subtle" color="cyan">
                <IconBrandInstagram />
              </ActionIcon>
              <ActionIcon variant="subtle" color="cyan">
                <IconBrandTelegram />
              </ActionIcon>
            </Flex>
          </Flex>
          <Flex className="w-full flex-col gap-12 p-8">
            <Image
              src={'/zare-logo.svg'}
              width={100}
              height={100}
              alt="Zare logo"
              className="ml-auto"
            />
            <Flex className="flex gap-8 ">
              <TextInput
                label="First Name"
                placeholder="Jane"
                className="w-1/2"
              />
              <TextInput
                label="Last Name"
                placeholder="Doe"
                className="w-1/2"
              />
            </Flex>
            <Flex className="flex gap-8">
              <TextInput
                label="Email"
                placeholder="Enter email"
                className="w-1/2"
              />
              <TextInput
                label="Phone Number"
                placeholder="Enter Phone Number"
                className="w-1/2"
              />
            </Flex>

            <Textarea
              minRows={6}
              autosize={true}
              label="Message"
              placeholder="Enter your message here"
            />
            <Button size="md" className="ml-auto">
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
