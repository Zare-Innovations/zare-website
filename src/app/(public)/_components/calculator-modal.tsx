'use client';

import { useState } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Select,
  Checkbox,
  Group,
  Stack,
  Text,
  Title,
  Grid,
  Progress,
  ActionIcon,
  Box,
  Flex,
  NumberInput,
} from '@mantine/core';
import { IconArrowRight, IconCalendar } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { roleOptions } from '@/hooks/calculator.util';
import SavingModal from './saving-modal';

const RATE_TABLE: Record<string, { marketRate: number; zareRate: number }> = {
  'UI/UX Designer': { marketRate: 45, zareRate: 20 },
  'Fullstack Software Engineer': { marketRate: 60, zareRate: 28 },
  'Back end Software Engineer': { marketRate: 55, zareRate: 26 },
  'Front end Software Engineer': { marketRate: 50, zareRate: 25 },
  'Mobile App Software Developer': { marketRate: 55, zareRate: 27 },
  'QA Engineer': { marketRate: 45, zareRate: 22 },
  'Customer Service Representative': { marketRate: 25, zareRate: 10 },
  'Virtual Assistant': { marketRate: 20, zareRate: 8 },
  'Back Office Support Specialist': { marketRate: 22, zareRate: 9 },
};

export default function ZareEstimatorModal() {
  const [open, { toggle, close }] = useDisclosure();
  const [isResultOpen, { open: openResult, close: closeResult }] =
    useDisclosure(false);
  const [
    isCustomHourModalOpen,
    { open: openHourModal, close: closeHourModal },
  ] = useDisclosure(false);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState('');
  const [customHoursPerWeek, setCustomHoursPerWeek] = useState<string | number>(
    0
  );
  const [employmentType, setEmploymentType] = useState<string>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [result, setResult] = useState<{
    role?: string;
    people?: number;
    hoursPerWeek?: number;
    marketCost?: number;
    zareCost?: number;
    savings?: number;
    savingsPercent?: string;
  }>({});

  const [errors, setErrors] = useState<{
    role?: string;
    count?: string;
    employmentType?: string;
    startDate?: string;
  }>({});

  const handleCalculate = () => {
    const newErrors: typeof errors = {};

    const roleLabel = roleOptions.find((r) => r.value === selectedRole)?.label;

    if (!roleLabel) {
      newErrors.role = 'Please select a role.';
    }

    if (!peopleCount || Number(peopleCount) <= 0) {
      newErrors.count = 'Please enter a valid number of people.';
    }

    if (!employmentType) {
      newErrors.employmentType = 'Please select employment type.';
    }

    if (employmentType === 'custom' && !customHoursPerWeek) {
      newErrors.employmentType = 'Please set custom work hours per week.';
    }

    if (!startDate) {
      newErrors.startDate = 'Please select a start date.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const role = roleOptions.find((r) => r.value === selectedRole)?.label;
    if (!role || !RATE_TABLE[role]) {
      return;
    }

    const hoursPerWeek =
      employmentType === 'custom'
        ? +customHoursPerWeek
        : employmentType === 'fulltime'
          ? 40
          : 20;

    const hoursPerMonth = hoursPerWeek * 4;
    const count = Number(peopleCount);
    const { marketRate, zareRate } = RATE_TABLE[role];

    const marketCost = marketRate * hoursPerMonth * count;
    const zareCost = zareRate * hoursPerMonth * count;
    const savings = marketCost - zareCost;
    const savingsPercent = (savings / marketCost) * 100;

    close();
    openResult();
    setResult({
      role,
      people: count,
      hoursPerWeek,
      marketCost,
      zareCost,
      savings,
      savingsPercent: savingsPercent.toFixed(2) + '%',
    });
  };

  return (
    <Group>
      <button
        onClick={toggle}
        className="font-bold text-[#0A293B] bg-white hover:bg-cyan-500 hover:text-white p-3 px-8"
      >
        Compare Rates Instantly
      </button>
      <SavingModal
        opened={isResultOpen}
        onClose={closeResult}
        result={result}
      />

      <Modal
        opened={isCustomHourModalOpen}
        onClose={closeHourModal}
        size={500}
        padding="xl"
        zIndex={1000}
        centered
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: '#ffffff',
          },
          body: {
            padding: '2rem',
          },
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Stack gap="xl">
              {/* Header */}
              <Title order={1} size="lg" fw={700} c="#000000">
                Custom
              </Title>

              {/* Input Field */}
              <NumberInput
                placeholder="How many hours per week?"
                value={customHoursPerWeek}
                onChange={(value) => setCustomHoursPerWeek(value)}
                styles={{
                  input: {
                    backgroundColor: '#f3f3f3',
                    border: 'none',
                    color: '#475569',
                    fontSize: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    height: '42px',
                    '&::placeholder': {
                      color: '#475569',
                    },
                    '&:focus': {
                      borderColor: 'transparent',
                      outline: 'none',
                    },
                  },
                }}
              />

              {/* Action Buttons */}
              <Flex gap="md" justify={'space-between'}>
                <Button
                  radius="md"
                  styles={{
                    root: {
                      backgroundColor: '#f0fdfa',
                      color: '#0a293b',
                      border: 'none',
                      fontWeight: 600,
                      height: '42px',
                      '&:hover': {
                        backgroundColor: '#f0fdfa',
                        opacity: 0.9,
                      },
                    },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  radius="md"
                  rightSection={<IconArrowRight size={20} />}
                  styles={{
                    root: {
                      backgroundColor: '#0a293b',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 600,
                      height: '42px',
                      '&:hover': {
                        backgroundColor: '#0a293b',
                        opacity: 0.9,
                      },
                    },
                  }}
                  onClick={() => {
                    closeHourModal();
                  }}
                >
                  Done
                </Button>
              </Flex>
            </Stack>
          </div>
        </div>
      </Modal>

      <Modal
        opened={open}
        onClose={close}
        size={1000}
        padding="xl"
        centered
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: '#ffffff',
          },
          body: {
            padding: '2rem',
          },
        }}
      >
        <Stack gap="xl">
          {/* Progress Indicator */}
          <Group justify="space-between" align="center">
            <Group gap="md" align="center">
              <Box
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#0a293b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                1
              </Box>
              <Box style={{ width: 320 }}>
                <Progress
                  value={50}
                  size="sm"
                  color="#0a293b"
                  styles={{
                    root: {
                      backgroundColor: '#f3f3f3',
                    },
                  }}
                />
              </Box>
            </Group>
            <Text size="lg" c="#6f6c90" fw={500}>
              2
            </Text>
          </Group>

          {/* Header */}
          <Stack gap="md">
            <Title order={1} c="#0a293b" fw={700}>
              Zare Savings Estimator
            </Title>
            <Text size="lg" c="#6f6c90">
              See how much your team could save in 30 seconds
            </Text>
          </Stack>

          {/* Form */}
          <Grid gutter="xl">
            {/* Left Column */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="xl">
                {/* Select Role */}
                <Stack gap="sm">
                  <Text fw={600} c="#000000">
                    Select Role
                  </Text>
                  <Select
                    placeholder="Select one..."
                    data={roleOptions}
                    value={selectedRole}
                    onChange={setSelectedRole}
                    error={errors.role}
                    styles={{
                      input: {
                        backgroundColor: '#f8f8f8',
                        border: '1px solid #f3f3f3',
                        color: '#6f6c90',
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Grid.Col>

            {/* Right Column */}
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="xl">
                {/* People Count */}
                <Stack gap="sm">
                  <Text fw={600} c="#000000">
                    How many people do you need for this role?
                  </Text>
                  <TextInput
                    placeholder="Enter Number Here"
                    value={peopleCount}
                    onChange={(event) =>
                      setPeopleCount(event.currentTarget.value)
                    }
                    error={errors.count}
                    type="number"
                    styles={{
                      input: {
                        backgroundColor: '#f8f8f8',
                        border: '1px solid #f3f3f3',
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Employment Type */}
          <Stack gap="md">
            <Text fw={600} c="#000000">
              Employment Type
            </Text>
            <Flex gap="xl" className="bg-[#f8f8f8] py-2 px-3">
              <Checkbox
                label="Full-time (40 hrs/week)"
                checked={employmentType === 'fulltime'}
                onClick={() => setEmploymentType('fulltime')}
                styles={{
                  label: {
                    color: '#000000',
                  },
                }}
              />
              <Checkbox
                label="Part-time (20 hrs/week)"
                checked={employmentType === 'parttime'}
                onClick={() => setEmploymentType('parttime')}
                styles={{
                  label: {
                    color: '#000000',
                  },
                }}
              />
              <Checkbox
                label={
                  customHoursPerWeek
                    ? `${customHoursPerWeek} hrs/week`
                    : 'Instead set custom work hours per week'
                }
                checked={employmentType === 'custom'}
                onClick={() => {
                  setEmploymentType('custom');
                  openHourModal();
                }}
                styles={{
                  label: {
                    color: '#000000',
                  },
                }}
              />
            </Flex>
            <div className="text-xs text-red-400">{errors.employmentType}</div>
          </Stack>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              {/* Start Date */}
              <Stack gap="sm">
                <Text fw={600} c="#000000">
                  Desired Start Date
                </Text>
                <DatePickerInput
                  placeholder="Select the expected start date"
                  value={startDate}
                  onChange={setStartDate}
                  error={errors.startDate}
                  minDate={new Date()}
                  rightSection={
                    <ActionIcon
                      size="lg"
                      style={{
                        backgroundColor: '#0a293b',
                        borderRadius: '4px',
                      }}
                    >
                      <IconCalendar size={16} color="white" />
                    </ActionIcon>
                  }
                  styles={{
                    input: {
                      backgroundColor: '#f8f8f8',
                      border: '1px solid #f3f3f3',
                    },
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Submit Button */}
          <Group justify="flex-end" mt="xl">
            <Button
              size="lg"
              onClick={handleCalculate}
              style={{
                backgroundColor: '#0a293b',
                fontWeight: 600,
                paddingLeft: '32px',
                paddingRight: '32px',
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: '#0a293b',
                    opacity: 0.9,
                  },
                },
              }}
            >
              Start Calculating
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Group>
  );
}
