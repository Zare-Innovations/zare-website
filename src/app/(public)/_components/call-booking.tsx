"use client";

import { IconPhone, IconMail, IconMapPin, IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import footerBg from "../../../../public/footerBg.jpg";

import React from "react";
import {
  Flex,
  Modal,
  Paper,
  Group,
  Text,
  TextInput,
  Textarea,
  ScrollArea,
  Tooltip,
  Stack,
  Card
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ClockIcon } from "lucide-react";
import styles from "./call-booking.module.css";
import CalendlyEmbed from "@/components/ui/calendly-embed";

const DAYS_IN_ADVANCE = 14;
const from = new Date();
const to = new Date(from.getTime() + 1000 * 60 * 60 * 24 * DAYS_IN_ADVANCE);

interface ApptTime {
  time: string;
  length: number;
  isAvailable: boolean;
  reason?: string | null;
}

const TIME_SLOTS: ApptTime[] = [
  { time: "10:30 AM", length: 30, isAvailable: true, reason: null },
  {
    time: "11:00 AM",
    length: 30,
    isAvailable: false,
    reason: "Already Scheduled"
  },
  { time: "03:30 PM", length: 30, isAvailable: true, reason: null },
  { time: "03:00 PM", length: 30, isAvailable: false, reason: "Emergency" },
  { time: "04:00 PM", length: 30, isAvailable: true, reason: null }
];

const formatDate = (date: string, long: boolean = false) => {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: long ? "numeric" : undefined
  });
};

function AppointmentModal({
  opened,
  onClose,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime
}: {
  opened: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedTime: ApptTime;
  setSelectedTime: (time: ApptTime | null) => void;
  setSelectedDate: (date: string | null) => void;
}) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetData = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => resetData(), 200);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetData();
    // TODO: Implement form submission (mantine notification?)
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      title={
        <span className="text-lg font-medium pl-2.5">Free Consultation</span>
      }
      size="md"
      overlayProps={{ blur: 2, backgroundOpacity: 0.35 }}
      withinPortal
    >
      <div className="flex flex-wrap items-center gap-2 font-medium pb-2.5 px-8">
        <span className="text-sm ">Book a Call for</span>
        <span className="text-sm  text-cyan-500">
          {formatDate(selectedDate, true)}{" "}
        </span>
        <span className="text-sm ">at</span>
        <span className="text-sm  text-cyan-500">{selectedTime.time}</span>
      </div>

      <Paper
        radius="md"
        shadow="md"
        p={{ base: 10, sm: 20 }}
        bg="var(--mantine-color-body)"
        maw={600}
        mx="auto"
      >
        <Flex gap="lg" direction={{ base: "column", lg: "row" }}>
          <Flex direction="column" gap="5px" style={{ flex: 1, minWidth: 220 }}>
            <Text fz="sm" fw={400} my={8} ta={"center"}>
              Please fill out the form below to book your free consultation.
            </Text>

            <form
              onSubmit={onSubmit}
              style={{ position: "relative" }}
              className="px-3"
            >
              <Stack gap="sm">
                <TextInput
                  name="name"
                  label="Name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  radius="sm"
                  size="md"
                  autoComplete="name"
                  className="flex flex-col gap-2"
                  labelProps={{ className: "text-sm font-normal" }}
                />
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                  radius="sm"
                  size="md"
                  autoComplete="email"
                  className="flex flex-col gap-2"
                  labelProps={{ className: "text-sm font-normal" }}
                />
                <TextInput
                  name="phone"
                  label="Phone"
                  placeholder="(optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  radius="sm"
                  size="md"
                  autoComplete="tel"
                  className="flex flex-col gap-2"
                  labelProps={{ className: "text-sm font-normal" }}
                />
                <Textarea
                  name="message"
                  label="Additional Info"
                  placeholder="Please share anything that will help prepare for our consultation"
                  value={formData.message}
                  onChange={handleInputChange}
                  minRows={4}
                  radius="sm"
                  size="md"
                  className="flex flex-col gap-2"
                  labelProps={{ className: "text-sm font-normal" }}
                />
                <button
                  className={`font-medium text-center gap-3 rounded-sm px-3 py-2 text-sm min-[500px]:text-base border-2 border-cyan-500 bg-cyan-500 text-white transition-all duration-500`}
                >
                  Book a Call
                </button>{" "}
              </Stack>
            </form>
          </Flex>
        </Flex>
      </Paper>
    </Modal>
  );
}

const DateTimePicker = ({
  openModal,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime
}: {
  openModal: () => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: ApptTime | null;
  setSelectedTime: (time: ApptTime | null) => void;
}) => {
  return (
    <Flex
      gap="md"
      style={{ flex: 1 }}
      className="h-[352px] flex flex-col sm:flex-row gap-4 sm:gap-6 max-sm:items-center justify-center"
    >
      <Card className="flex flex-col gap-3 bg-black px-4 pb-4 pt-0 rounded-md shadow-white/20 shadow-[0.5px_0.5px_5px_1px_rgba(255,255,255,0.01)]">
        <Flex className="relative h-10 flex items-center text-white border-b border-white/20 overflow-hidden">
          <Flex
            className={`absolute inset-0 items-center justify-between gap-4 text-white text-sm ${selectedDate ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} transition-all duration-300`}
          >
            <span>{selectedDate && formatDate(selectedDate)}</span>
            <span>{selectedDate && new Date(selectedDate).getFullYear()}</span>
          </Flex>
          <Flex
            className={`absolute inset-0 items-center justify-between gap-4 text-white text-sm  ${selectedDate ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"} transition-all duration-300`}
          >
            <span className="text-sm text-white ">Select Date & Time</span>
            <span className="text-xs text-white/80 ">
              Available in next {DAYS_IN_ADVANCE} days
            </span>
          </Flex>
        </Flex>
        <DatePicker
          allowDeselect
          minDate={from}
          maxDate={to}
          size="md"
          value={selectedDate}
          onChange={setSelectedDate}
          classNames={{
            datePickerRoot: styles.datePickerRoot,
            calendarHeader: styles.calendarHeader,
            calendarHeaderControl: styles.calendarHeaderControl,
            calendarHeaderControlIcon: styles.calendarHeaderControlIcon,
            calendarHeaderLevel: styles.calendarHeaderLevel,
            levelsGroup: styles.levelsGroup,
            yearsList: styles.yearsList,
            yearsListRow: styles.yearsListRow,
            yearsListCell: styles.yearsListCell,
            yearsListControl: styles.yearsListControl,
            monthsList: styles.monthsList,
            monthsListRow: styles.monthsListRow,
            monthsListCell: styles.monthsListCell,
            monthsListControl: styles.monthsListControl,
            monthThead: styles.monthThead,
            monthRow: styles.monthRow,
            monthTbody: styles.monthTbody,
            monthCell: styles.monthCell,
            month: styles.month,
            weekdaysRow: styles.weekdaysRow,
            weekday: styles.weekday,
            day: styles.day,
            weekNumber: styles.weekNumber,
            presetsList: styles.presetsList,
            presetButton: styles.presetButton
          }}
        />
      </Card>
      <Card
        className={`${selectedDate ? "max-sm:h-max w-full sm:w-[250px] opacity-100" : "max-sm:h-0 sm:w-0 opacity-0"} flex-col gap-3 bg-black text-white px-4 pb-4 pt-0 rounded-md shadow-white/20 shadow-[0.5px_0.5px_5px_1px_rgba(255,255,255,0.01)] transition-all duration-500`}
      >
        <Flex
          className={`h-10 items-center gap-2.5 text-white text-sm border-b border-white/20`}
        >
          <ClockIcon size={16} color="cyan" strokeWidth={1.5} />
          <span className="text-sm text-white ">
            times you&apos;re available
          </span>
        </Flex>
        <ScrollArea.Autosize
          mah={352 - 52}
          mx={0}
          offsetScrollbars
          scrollbars="y"
          styles={{ viewport: { overflowX: "hidden" } }}
        >
          <Flex className="flex flex-col gap-3.5">
            {TIME_SLOTS.map((slot) =>
              slot.isAvailable ? (
                <Flex key={slot.time} className={`gap-2 flex-1`}>
                  <button
                    className={` text-center gap-3 rounded-sm px-3 py-2 text-sm min-[500px]:text-base ${
                      selectedTime?.time === slot.time
                        ? "min-w-max flex-1 border-2 border-cyan-900 bg-cyan-900 text-white"
                        : "min-w-full border-2 border-cyan-500 bg-cyan-500/20 text-white hover:bg-cyan-500"
                    } transition-all duration-500`}
                    style={{
                      flex: selectedTime?.time === slot.time ? "1" : "initial",
                      width:
                        selectedTime?.time === slot.time ? "auto" : undefined
                    }}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot.time}
                  </button>{" "}
                  <button
                    className={`${selectedTime?.time === slot.time ? "w-max opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-full"} text-center gap-3 rounded-sm px-3 py-2 text-sm min-[500px]:text-base border-2 border-cyan-500 bg-cyan-500 text-white transition-all duration-500`}
                    onClick={() => openModal()}
                  >
                    Next
                  </button>{" "}
                </Flex>
              ) : (
                <Tooltip
                  key={slot.time}
                  label={
                    <Group gap={3}>
                      <Text span fw={600} c="red.6">
                        Not Available:
                      </Text>
                      <Text span fz="sm">
                        {slot.reason}
                      </Text>
                    </Group>
                  }
                  position="right"
                  withArrow
                  disabled={false}
                  transitionProps={{ duration: 120 }}
                >
                  <button
                    key={slot.time}
                    className={`text-center gap-3 rounded-sm px-3 py-2 text-sm min-[430px]:text-sm min-[500px]:text-base border-2 border-cyan-500/20 bg-cyan-500/20 text-white/50 transition-all duration-300`}
                    disabled
                  >
                    {slot.time}
                  </button>
                </Tooltip>
              )
            )}
          </Flex>
        </ScrollArea.Autosize>
      </Card>
    </Flex>
  );
};

export default function CallBooking() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<ApptTime | null>(null);

  return (
    <div
      className="relative w-screen overflow-hidden flex flex-col gap-14 sm:gap-16 py-14 bg-[#0a293b] bg-cover bg-center bg-no-repeat text-slate-100 max-sm:px-5 max-md:px-16 md:px-12"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 41, 59, 0.85), rgba(10, 41, 59, 0.92)), url(${footerBg.src})`
      }}
    >
      <Flex className="relative z-10 w-full flex-col gap-7 justify-center items-center">
        <Flex className="flex flex-col mx-auto gap-3 sm:gap-5 text-center">
          <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center uppercase text-white">
            Book a call today!
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Book a FREE discovery call to discuss your project and challenges
            and find the best approach for executing it.{" "}
          </p>
        </Flex>
        {/* {selectedDate && selectedTime && (
          <AppointmentModal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
          />
        )}
        <DateTimePicker
          openModal={() => setModalOpen(true)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        /> */}
        <CalendlyEmbed url="https://calendly.com/emanuel-ypgh/30min" />
      </Flex>

      <Flex className="relative z-10 flex-col gap-10 justify-center items-center">
        <Flex className="flex flex-col gap-3 sm:gap-5 text-center">
          <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center uppercase text-white">
            Prefer to reach us directly?
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Feel free to shoot us an email or call at any time
          </p>
        </Flex>

        <Flex className=" flex-col sm:flex-row gap-4 justify-center sm:items-center">
          <Flex className="flex flex-col gap-4">
            <Link
              href="tel:+251938169380"
              className="flex items-center gap-2 text-base font-medium"
            >
              <IconPhone size={20} />
              +251938169380
            </Link>
            <Link
              href="https://wa.me/17033955235"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-medium"
            >
              <IconBrandWhatsapp size={20} />
              +17033955235
            </Link>
          </Flex>

          <Link
            href="mailto:info@zareinnovations.com"
            className="flex items-center gap-2 text-base font-medium"
          >
            <IconMail size={20} />
            info@zareinnovations.com
          </Link>
        </Flex>

        <Flex className="flex flex-col gap-6 mt-4 ">
          <div className="flex items-start gap-2">
            <IconMapPin size={20} />
            <span className="flex-1 text-[15px]">
              651 N Broad St, Suite 201, Middletown, Delaware, 19709,
              United States
            </span>
          </div>
          <div className="flex items-start gap-2">
            <IconMapPin size={20} />
            <span className="flex-1 text-[15px]">
              Abyssinia Real Estate Building, 13th floor, Bole Japan, Africa Ave, Addis Ababa, Ethiopia
            </span>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
