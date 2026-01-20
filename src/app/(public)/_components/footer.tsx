
import { Flex } from "@mantine/core";
import BottomFooter from "./bottom-footer";
import CallBooking from "./call-booking";

export default function Footer() {
  return (
    <Flex className="flex-col">
      <CallBooking />
      <BottomFooter />
    </Flex>
  );
}
