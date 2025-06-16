import {
  Box,
  Paper,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Stack,
  Title,
} from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { IconMail, IconLock, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Paper
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Logo */}
      <Box p="xl" style={{ alignSelf: 'flex-end' }}>
        <div>
          <Image
            src={'/zare-logo.svg'}
            width={300}
            height={300}
            alt="Zare Logo"
            className="w-full"
          />
        </div>
      </Box>

      {/* Login Form */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Stack gap="xl" style={{ width: '100%', maxWidth: 400 }}>
          <Stack gap="xs" align="center">
            <Title order={2} fw={700} c="#1e3a5f" size="2rem">
              WELCOME BACK
            </Title>
            <Text c="dimmed" size="sm" fw={500}>
              LOG IN TO CONTINUE
            </Text>
          </Stack>

          <Stack gap="md">
            <TextInput
              placeholder="example@email.com"
              leftSection={<IconMail size={18} color="#9ca3af" />}
              size="lg"
              styles={{
                input: {
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  padding: '1rem 1rem 1rem 3rem',
                  fontSize: '1rem',
                },
              }}
            />

            <PasswordInput
              placeholder="••••••••••"
              leftSection={<IconLock size={18} color="#9ca3af" />}
              size="lg"
              visibilityToggleButtonProps={{
                'aria-label': 'Toggle password visibility',
                children: (
                  <Text size="sm" c="dimmed" fw={500}>
                    show
                  </Text>
                ),
              }}
              styles={{
                input: {
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',

                  padding: '1rem 1rem 1rem 3rem',
                  fontSize: '1rem',
                },
                visibilityToggle: {
                  border: 'none',
                  backgroundColor: 'transparent',
                },
              }}
            />
            <Button
              size="lg"
              rightSection={<IconArrowRight size={18} />}
              style={{
                backgroundColor: '#1e3a5f',
                borderRadius: '8px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: '1rem',
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: '#2c5f7c',
                  },
                },
              }}
            >
              <Link href={'/admin/job'} className="w-full h-full">
                Proceed to my Account
              </Link>
            </Button>
          </Stack>

          <Box style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/admin/forgot-password">
              <Anchor
                href="#"
                c="dimmed"
                size="sm"
                style={{ textDecoration: 'none' }}
              >
                Forgot Password?
              </Anchor>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
