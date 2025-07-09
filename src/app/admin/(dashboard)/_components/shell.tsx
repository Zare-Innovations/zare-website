'use client';
import { AppShell, Burger, Flex, ScrollArea, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

import Sidebar from './side-bar';

export function Shell({ children }: { children: ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  //   const { user } = useAuth();

  return (
    <AppShell
      header={{ height: '60px' }}
      layout="alt"
      navbar={{
        width: desktopOpened ? 270 : 70,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header className="backdrop-blur-3xl bg-white/100 border-b-0 pt-3">
        <Box className="sm:hidden">
          <AppShell.Section className="outline-red-400 h-[50px]">
            <div className="flex items-center justify-center h-full flex-wrap gap-4 my-2">
              <Flex className="w-3/4 h-full items-center gap-2">
                <div
                  className="w-1/4 h-3/4"
                  style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                  }}
                />
                <Flex direction={'column'} gap="0"></Flex>
              </Flex>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                size="sm"
                hiddenFrom="sm"
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                size="sm"
                visibleFrom="sm"
              />
            </div>
          </AppShell.Section>
        </Box>
      </AppShell.Header>
      <AppShell.Navbar>
        <ScrollArea className="bg-[#0a293b]">
          <Sidebar />
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main className="w-full bg-neutral-100">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
