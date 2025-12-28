'use client';

import { Box, Burger, Divider, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./nav-bar.module.css";
import Image from "next/image";
import Link from "next/link";

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group
          justify="space-between"
          h="100%"
          className=" min-[500px]:px-3 sm:px-12"
        >
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

          <Group h="100%" gap={0} visibleFrom="md">
            <Link href="/#aboutUs" className={classes.link}>
              About Us
            </Link>
            <Link href="/#services" className={classes.link}>
              Our Services
            </Link>
            <Link href="/our-work" className={classes.link}>
              Our Work
            </Link>
            <a href="#contact-us" className={classes.link}>
              Contact Us
            </a>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
          />
        </Group>
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

          <Link href="/#" className={classes.link} onClick={toggleDrawer}>
            Home
          </Link>

          <Link
            href="/#aboutUs"
            className={classes.link}
            onClick={toggleDrawer}
          >
            About Us
          </Link>
          <Link
            href="/#services"
            className={classes.link}
            onClick={toggleDrawer}
          >
            Our Services
          </Link>
          <Link
            href="/our-work"
            className={classes.link}
            onClick={toggleDrawer}
          >
            Our Work
          </Link>
          <a href="#contact-us" className={classes.link} onClick={toggleDrawer}>
            Contact Us
          </a>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
