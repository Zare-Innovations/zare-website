import {
  Button,
  TextInput,
  Container,
  Grid,
  Box,
  Text,
  Group,
  Stack,
  Modal,
  Flex,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const dismissToast = () => {
    const wasSuccess = toast?.type === 'success';
    setToast(null);
    if (wasSuccess) {
      setEmail('');
      setError('');
      onClose();
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setToast(null);
    if (!z.string().email().safeParse(email).success) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        'https://landing.zareinnovations.com/api/resource-rate/send-email',
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

      if (!res.ok) {
        setToast({ type: 'error', message: 'Failed to send email. Please try again later.' });
        return;
      }

      setToast({ type: 'success', message: 'Your savings report has been sent to your email!' });
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to send email. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
 <Modal opened={opened} onClose={onClose} size={1000}>
  <form onSubmit={e=>handleSubmit(e)}>
    <Box bg="#ffffff">
      <Container size="lg" className=' md:py-4'>
        {/* Toast Modal */}
        <Modal
          opened={!!toast}
          onClose={dismissToast}
          size="sm"
          centered
          withCloseButton={false}
          zIndex={1000}
          overlayProps={{ backgroundOpacity: 0.3 }}
          styles={{
            content: { borderRadius: '16px' },
          }}
        >
          <Stack align="center" gap="md" py="md">
            <Box
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                toast?.type === 'success' ? 'bg-teal-100' : 'bg-red-100'
              }`}
            >
              {toast?.type === 'success' ? (
                <IconCheck size={32} className="text-teal-600" />
              ) : (
                <IconX size={32} className="text-red-600" />
              )}
            </Box>
            <Text fw={700} size="lg" c={toast?.type === 'success' ? 'teal' : 'red'}>
              {toast?.type === 'success' ? 'Success' : 'Error'}
            </Text>
            <Text ta="center" c="dimmed" size="sm">
              {toast?.message}
            </Text>
            <Button
              onClick={dismissToast}
              color={toast?.type === 'success' ? 'teal' : 'red'}
              radius="md"
              fullWidth
              maw={200}
            >
              OK
            </Button>
          </Stack>
        </Modal>

        {/* Progress Indicator */}
        <Group justify="center" mb={20}>
          <Box className="w-full ">
            <Group justify="space-between" align="center">
              <Box
       className="w-8 h-8 md:w-12 md:h-12 bg-[#0a293b] rounded-full flex items-center justify-center text-white font-semibold"
              >
                1
              </Box>
              <Box flex={1} h={4} bg="#1e293b" mx="md" style={{ borderRadius: '2px' }} />
              <Box
          className="w-8 h-8 md:w-12 md:h-12 bg-[#0a293b] rounded-full flex items-center justify-center text-white font-semibold"
              >
                2
              </Box>
            </Group>
          </Box>
        </Group>

        {/* Content Grid */}
        <Grid gutter={40} align="center">
          {/* Illustration */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              bg="#c8ebe2"
              p={{ base: 24, md: 40 }}
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
                  maxWidth: '400px',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid.Col>

          {/* Content */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={32}>
              {/* Heading */}
              <Stack gap={8}>
                <div
                  className="text-2xl md:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight"
                >
                  You&apos;re Saving Big!
                </div>
                <Text className="text-[#1e293b] text-base md:text-lg leading-relaxed">
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
              <Text className="text-[#64748b] text-base leading-relaxed">
                Want a shareable report? Enter your email and hit Send — we&apos;ll email you a detailed PDF with charts, savings breakdown, and time-to-hire benefits.
              </Text>

              {/* Email Form */}
              <Flex direction={{ base: 'column', sm: 'row' }} gap="md">
                <TextInput
                  placeholder="Enter your email"
                  size="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  type="email"
                  className="w-full"
                  styles={{
                    input: {
                      height: '48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      color: '#64748b',
                    },
                  }}
                />
     <button
  type="submit"
  disabled={loading}
  className="w-full sm:w-auto bg-[#1e293b] text-white px-8 h-12 rounded-lg font-medium text-base hover:bg-[#0f172a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Submiting...' : 'Submit'}
</button>
              </Flex>

              {/* Link */}
              <Text className="text-[#64748b] leading-relaxed">
                Click here to schedule a free consultation and see how Zare can help you scale smarter.
              </Text>

              <Link
                href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
                className="w-full sm:w-auto"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="md"
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
