
"use client";

import { Box, Burger, Divider, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./nav-bar.module.css";
import Image from "next/image";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

export function NavBarV2() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box className="px-4 lg:px-20">
      <header className={classes.header2}>
        <Group justify="space-between" h="100%" px={0}>
          {/* Logo */}
          <div className="flex items-center ">
            <Link href="/">
              <Image
                src="/zareblacklogo.svg"
                width={260}
                height={80}
            
                alt="Zare Innovations Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <Group h="100%" gap={30} visibleFrom="md">
            <Link href="/#aboutUs" className={classes.link}>
              About Us
            </Link>

            <div className="flex items-center space-x-1">
              <Link href="/#services" className={classes.link}>
                Services
              </Link>
              <IconChevronDown size={16} stroke={1.5} />
            </div>

            <Link href="/portfolio" className={classes.link}>
              Portfolio
            </Link>

            <Link href="/careers" className={classes.link}>
              Careers
            </Link>

            <Link href="#contact-us" className={classes.link}>
              Contact Us
            </Link>
          </Group>

          {/* Mobile Menu Toggle */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
          />
        </Group>
      </header>

      {/* Drawer for Mobile */}
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

          <Link href="/#aboutUs" className={classes.link} onClick={closeDrawer}>
            About Us
          </Link>

          <Link
            href="/#services"
            className={classes.link}
            onClick={closeDrawer}
          >
            Services
          </Link>

          <Link
            href="/portfolio"
            className={classes.link}
            onClick={closeDrawer}
          >
            Portfolio
          </Link>

          <Link href="/careers" className={classes.link} onClick={closeDrawer}>
            Careers
          </Link>

          <a href="#contact-us" className={classes.link} onClick={closeDrawer}>
            Contact Us
          </a>

          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
