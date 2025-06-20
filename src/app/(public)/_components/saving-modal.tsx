import {
  Button,
  TextInput,
  Container,
  Grid,
  Box,
  Text,
  Title,
  Group,
  Stack,
  Modal,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

export default function SavingModal({
  opened,
  onClose,
  result,
}: {
  result: {
    role?: string;
    people?: number;
    hoursPerWeek?: number;
    marketCost?: number;
    zareCost?: number;
    savings?: number;
    savingsPercent?: string;
  };
  opened: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!z.string().email().safeParse(email).success) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/api/resource-rate/send-email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipientName: email,
            recipientEmail: email,
            resourceType: result.role,
            teamSize: result.people,
            weeklyCommitment: result.hoursPerWeek,
          }),
        }
      );
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send email. Please try again later.');
      return;
    }

    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} size={1000}>
      <form onSubmit={handleSubmit}>
        <Box bg="#ffffff">
          <Container size="1200px">
            {/* Progress Indicator */}
            <Group justify="center" mb={20}>
              <Box w={600}>
                <Group justify="space-between" align="center">
                  <Box
                    w={48}
                    h={48}
                    bg="#1e293b"
                    c="white"
                    style={{
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    1
                  </Box>
                  <Box
                    flex={1}
                    h={4}
                    bg="#1e293b"
                    mx="md"
                    style={{ borderRadius: '2px' }}
                  />
                  <Box
                    w={48}
                    h={48}
                    bg="#1e293b"
                    c="white"
                    style={{
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    2
                  </Box>
                </Group>
              </Box>
            </Group>

            {/* Main Content */}
            <Grid gutter={60} align="center">
              {/* Left Side - Illustration */}
              <Grid.Col span={6}>
                <Box
                  bg="#c8ebe2"
                  p={40}
                  style={{
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: '1.2',
                  }}
                >
                  <Image
                    src="/calculator/result-illustration.svg"
                    alt="Savings illustration"
                    width={400}
                    height={320}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '400px',
                    }}
                  />
                </Box>
              </Grid.Col>

              {/* Right Side - Content */}
              <Grid.Col span={6}>
                <Stack gap={32}>
                  {/* Main Heading */}
                  <Stack gap={16}>
                    <Title
                      order={1}
                      size={48}
                      fw={700}
                      c="#1e293b"
                      lh={1.1}
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      You&apos;re Saving Big!
                    </Title>
                    <Text c="#1e293b" lh={1.4} fw={400}>
                      You could save{' '}
                      <Text component="span" fw={700}>
                        ${result.savings?.toLocaleString() || '0'}
                      </Text>
                      /month — that&apos;s{' '}
                      <Text component="span" fw={700}>
                        {result.savingsPercent || '0.00'}
                      </Text>{' '}
                      less than standard market rates.
                    </Text>
                  </Stack>

                  {/* Description */}
                  <Text c="#64748b" lh={1.5}>
                    Want a shareable report? Enter your email and hit Send —
                    we&apos;ll email you a detailed PDF with charts, savings
                    breakdown, and time-to-hire benefits.
                  </Text>

                  {/* Email Form */}
                  <Group gap={12} align="flex-end">
                    <TextInput
                      placeholder="Enter your email"
                      size="lg"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      error={error}
                      type="email"
                      flex={1}
                      styles={{
                        input: {
                          height: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '16px',
                          color: '#64748b',
                          '&::placeholder': {
                            color: '#9ca3af',
                          },
                        },
                        error: {
                          fontSize: '12px',
                        },
                      }}
                    />
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      bg="#1e293b"
                      c="white"
                      px={32}
                      h={48}
                      style={{
                        borderRadius: '8px',
                        fontWeight: 500,
                        fontSize: '16px',
                      }}
                      styles={{
                        root: {
                          '&:hover': {
                            backgroundColor: '#0f172a',
                          },
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Group>

                  {/* Consultation Text */}
                  <Text c="#64748b" lh={1.5}>
                    Click here to schedule a free consultation and see how Zare
                    can help you scale smarter.
                  </Text>

                  {/* Consultation Button */}
                  <Link
                    href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
                    className="mx-auto md:ml-0"
                    target="_blank"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      h={48}
                      c="#1e293b"
                      style={{
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 500,
                        border: '1px solid #1e293b',
                      }}
                      styles={{
                        root: {
                          '&:hover': {
                            backgroundColor: '#1e293b',
                            color: 'white',
                          },
                        },
                      }}
                    >
                      Book a Free Consultation
                    </Button>
                  </Link>
                </Stack>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      </form>
    </Modal>
  );
}
