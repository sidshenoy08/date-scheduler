'use client'

import {
  Box,
  Button,
  Center,
  DatePicker,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
  IconButton
} from "@chakra-ui/react";
import {
  Time,
  getLocalTimeZone,
  isToday,
  today
} from "@internationalized/date";
import { useState, useRef } from "react";
import { LuGlobe, LuArrowRight, LuArrowLeft } from "react-icons/lu";

import DateActivities from "./dateActivities";


export default function Scheduler() {
  const tz = getLocalTimeZone();
  const minDate = today(tz);

  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const scrollContainerRef = useRef(null);

  /* --- Utilities --- */

  const generateTimeSlots = (date) => {
    const day = date.toDate(tz).getDay();
    const slots = [];
    const start = 9;
    const end = day === 5 ? 14 : 17;

    for (let hour = start; hour < end; hour++) {
      slots.push(new Time(hour, 0))
      if (hour < end - 1 || day !== 5) {
        slots.push(new Time(hour, 30))
      }
    }

    // simulate some unavailable slots
    const seed = date.day + date.month;
    return slots.filter((_, i) => (i + seed) % 5 !== 0);
  }

  const formatTime = (time) =>
    `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;

  const formatWeekday = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  const formatMonthDay = (date) =>
    date.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  const date = selectedDate[0]
  const slots = date ? generateTimeSlots(date) : []
  const nativeDate = date?.toDate(tz)

  const handleDateChange = (details) => {
    setSelectedDate(details.value)
    setSelectedTime(null);
  }

  const handleTimeClick = (time) => {
    setSelectedTime(
      selectedTime && selectedTime.compare(time) === 0 ? null : time,
    )
    console.log(time);
  };

  const scrollToActivities = () => {
    if (!selectedTime || !selectedDate[0]) {
      alert("Please select a date and time, beautiful!");
      return;
    }

    scrollContainerRef.current?.scrollTo({
      left: window.innerWidth,
      behavior: "smooth"
    });
  };

  const scrollToScheduler = () => {
    scrollContainerRef.current?.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  }

  const TimeGrid = (props) => {
    const { slots, selectedTime, onTimeClick } = props

    return (
      <Stack gap="2" px="4" pb="4" flex="1" overflowY="auto" maxH="380px">
        {slots.map((time) => {
          const isSelected =
            selectedTime != null && selectedTime.compare(time) === 0
          const label = formatTime(time)

          return (
            <Button
              key={label}
              variant={isSelected ? "solid" : "outline"}
              size="sm"
              rounded="lg"
              fontWeight="semibold"
              onClick={() => onTimeClick(time)}
            >
              {label}
            </Button>
          )
        })}
      </Stack>
    )
  };

  return (
    <Box
      ref={scrollContainerRef}
      w="100vw"
      h="100vh"
      overflowX="hidden"
      overflowY="hidden"
    >
      <Flex w="200vw" h="100vh">
        <Center h="100vh" w="100vw" bgColor="pink.50" flexShrink={0}>
          <VStack gap="4rem">
            <h1 className='!font-sans !text-2xl !font-bold'>Select when you would like to meet</h1>
            <HStack>
              <Flex
                direction={{ base: "column", md: "row" }}
                borderWidth="1px"
                rounded="xl"
                overflow="hidden"
                width="fit-content"
              >
                {/* Calendar */}
                <Box
                  borderEndWidth={{ md: "1px" }}
                  borderBottomWidth={{ base: "1px", md: "0" }}
                >
                  <Stack gap="0" px="5" py="5">
                    <Text fontWeight="semibold" textStyle="lg">
                      Select a Date
                    </Text>
                    <Text textStyle="sm" color="fg.muted">
                      Pick a day for your meeting
                    </Text>
                  </Stack>

                  <DatePicker.Root
                    inline
                    value={selectedDate}
                    onValueChange={handleDateChange}
                    width="fit-content"
                    hideOutsideDays
                    min={minDate}
                  >
                    <DatePicker.Content unstyled px="3" pb="4">
                      <DatePicker.View view="day">
                        <HStack justify="space-between" gap="0">
                          <DatePicker.PrevTrigger />
                          <DatePicker.RangeText fontWeight="medium" textStyle="sm" />
                          <DatePicker.NextTrigger />
                        </HStack>
                        <DatePicker.DayTable />
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Root>

                  <HStack px="5" pb="4" color="fg.muted" textStyle="xs">
                    <LuGlobe />
                    <span>{tz}</span>
                  </HStack>
                </Box>

                {/* Time slots */}
                <Stack minW="240px" flex="1">
                  {date && nativeDate ? (
                    <Stack gap="0" flex="1">
                      <Stack gap="0" px="5" pt="5" pb="3">
                        <Text fontWeight="semibold">
                          {isToday(date, tz) ? "Today" : formatWeekday(nativeDate)}
                        </Text>
                        <Text textStyle="sm" color="fg.muted">
                          {formatMonthDay(nativeDate)}
                        </Text>
                      </Stack>

                      <TimeGrid
                        slots={slots}
                        selectedTime={selectedTime}
                        onTimeClick={handleTimeClick}
                      />
                    </Stack>
                  ) : (
                    <Center height="full" px="8" py="10" color="fg.muted">
                      <Stack align="center" gap="1" textAlign="center">
                        <Text textStyle="sm" fontWeight="medium">
                          Select a date
                        </Text>
                        <Text textStyle="xs">Available time slots will appear here</Text>
                      </Stack>
                    </Center>
                  )}
                </Stack>
              </Flex>
              <IconButton aria-label="Confirm" rounded="full" onClick={scrollToActivities}>
                <LuArrowRight />
              </IconButton>
            </HStack>
          </VStack>
        </Center>
        <Box
          w="100vw"
          h="100vh"
          bgColor="pink.50"
          flexShrink={0}
          overflowY="auto"
        >
          <Center>
            <VStack gap="2rem" w="100%" maxW="900px" py="8">
              <HStack w="100%" justify="space-between">
                <IconButton
                  aria-label="Back"
                  rounded="full"
                  colorPalette="pink"
                  onClick={scrollToScheduler}
                >
                  <LuArrowLeft />
                </IconButton>

                <h1 className="!font-sans !text-2xl !font-bold">
                  Choose some fun activities for our date!
                </h1>

                <Box w="40px" />
              </HStack>
              <HStack>
                <DateActivities />
                <IconButton aria-label="Confirm" rounded="full" onClick={scrollToActivities}>
                  <LuArrowRight />
                </IconButton>
              </HStack>
            </VStack>
          </Center>
        </Box>
      </Flex>
    </Box>
  )
}