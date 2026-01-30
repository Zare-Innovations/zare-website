"use client";

import { Burger, Divider, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/#aboutUs", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/our-work", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "#contact-us", label: "Contact Us" },
];

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <div>
      <header className="h-[90px] px-4 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-between h-full min-[500px]:px-3 sm:px-12">
          <div className="w-36">
            <Link href="/">
              <Image
                src={"/zare-innovations-logo.svg"}
                width={1500}
                height={1500}
                className="w-full"
                alt="Zare Logo"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center h-full gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center h-full px-4 no-underline text-black dark:text-white font-medium text-base hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
          />
        </div>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Zare Innovations"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md" className="space-y-5">
          <Divider my="sm" />

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center h-[42px] w-full px-4 no-underline text-black dark:text-white font-medium text-base hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-300"
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}
        </ScrollArea>
      </Drawer>
    </div>
  );
}
