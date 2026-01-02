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
    <Group className="px-0">
      <button
        onClick={toggle}
        className="flexsm:w-auto text-center font-semibold text-[#1a202c] bg-white border border-[#1a202c] hover:bg-[#1a202c] hover:text-white px-8 py-3 rounded transition duration-200"
      >
        Try Zare&apos;s ROI Calculator Now
      </button>

      <SavingModal
        opened={isResultOpen}
        onClose={closeResult}
        result={result}
      />

      {/* Custom Hour Modal */}
      <Modal
        opened={isCustomHourModalOpen}
        onClose={closeHourModal}
        size="auto"
        padding="xl"
        zIndex={1000}
        centered
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: "#ffffff"
          },
          body: {
            padding: "2rem"
          }
        }}
      >
        <div className="max-w-sm mx-auto bg-white">
          <Stack gap="xl">
            <Title order={1} size="lg" fw={700} c="#000000">
              Custom
            </Title>

            <NumberInput
              placeholder="How many hours per week?"
              value={customHoursPerWeek}
              onChange={setCustomHoursPerWeek}
              styles={{
                input: {
                  backgroundColor: "#f3f3f3",
                  border: "none",
                  color: "#475569",
                  fontSize: "16px",
                  padding: "16px",
                  borderRadius: "8px",
                  height: "42px"
                }
              }}
            />

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap="md"
              justify="space-between"
            >
              <Button
                radius="md"
                fullWidth
                styles={{
                  root: {
                    backgroundColor: "#f0fdfa",
                    color: "#0a293b",
                    fontWeight: 600
                  }
                }}
                onClick={closeHourModal}
              >
                Cancel
              </Button>
              <Button
                radius="md"
                fullWidth
                rightSection={<IconArrowRight size={20} />}
                styles={{
                  root: {
                    backgroundColor: "#0a293b",
                    color: "#ffffff",
                    fontWeight: 600
                  }
                }}
                onClick={closeHourModal}
              >
                Done
              </Button>
            </Flex>
          </Stack>
        </div>
      </Modal>

      {/* Estimator Modal */}
      <Modal
        opened={open}
        onClose={close}
        size={1000}
        // padding="xl"
        centered
        withCloseButton={true}
        styles={{
          content: {
            backgroundColor: "#ffffff"
          }
        }}
      >
        <Stack className="px-[2rem] pb-4">
          {/* Progress Indicator */}
          <Flex justify="space-between" align="center" wrap="nowrap">
            <Group gap="md" align="center" className="flex-nowrap">
              {/* Step 1 */}
              <Box className="w-8 h-8 md:w-12 md:h-12 bg-[#0a293b] rounded-full flex items-center justify-center text-white font-semibold">
                1
              </Box>

              {/* Progress Bar */}
              <Box className="w-[12.5rem] md:w-[50.5rem]">
                <Progress
                  value={50}
                  size="sm"
                  color="#0a293b"
                  styles={{
                    root: { backgroundColor: "#f3f3f3" }
                  }}
                />
              </Box>
            </Group>

            {/* Step 2 */}
            <Text size="lg" c="#6f6c90" fw={500}>
              2
            </Text>
          </Flex>

          {/* Header */}
          <Stack gap="sm">
            <div className="text-2xl md:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight">
              Zare Savings Estimator
            </div>

            <Text size="lg" c="#6f6c90">
              See how much your team could save in 30 seconds
            </Text>
          </Stack>

          {/* Form Grid */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
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
                      backgroundColor: "#f8f8f8",
                      border: "1px solid #f3f3f3",
                      color: "#6f6c90"
                    }
                  }}
                />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="sm">
                <Text fw={600} c="#000000">
                  How many people?
                </Text>
                <TextInput
                  placeholder="Enter Number Here"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.currentTarget.value)}
                  error={errors.count}
                  type="number"
                  styles={{
                    input: {
                      backgroundColor: "#f8f8f8",
                      border: "1px solid #f3f3f3"
                    }
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Employment Type */}
          <Stack gap="md">
            <Text fw={600} c="#000000">
              Employment Type
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap="md"
              className="bg-[#f8f8f8] py-3 px-4 rounded"
            >
              <Checkbox
                label="Full-time (40 hrs/week)"
                checked={employmentType === "fulltime"}
                onChange={() => setEmploymentType("fulltime")}
              />
              <Checkbox
                label="Part-time (20 hrs/week)"
                checked={employmentType === "parttime"}
                onChange={() => setEmploymentType("parttime")}
              />
              <Checkbox
                label={
                  customHoursPerWeek
                    ? `${customHoursPerWeek} hrs/week`
                    : "Set custom work hours"
                }
                checked={employmentType === "custom"}
                onChange={() => {
                  setEmploymentType("custom");
                  openHourModal();
                }}
              />
            </Flex>
            <div className="text-xs text-red-400">{errors.employmentType}</div>
          </Stack>

          {/* Start Date */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
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
                    <ActionIcon size="lg" className="bg-[#0a293b] rounded">
                      <IconCalendar size={16} color="white" />
                    </ActionIcon>
                  }
                  styles={{
                    input: {
                      backgroundColor: "#f8f8f8",
                      border: "1px solid #f3f3f3"
                    }
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Submit Button */}
          <Group justify="end" className="mt-4">
            <button
              onClick={handleCalculate}
              className="w-full sm:w-auto bg-[#0a293b] text-white font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity text-base"
            >
              Start Calculating
            </button>
          </Group>
        </Stack>
      </Modal>
    </Group>
  );
}
