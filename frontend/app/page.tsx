'use client'

import { Button, VStack, Center } from "@chakra-ui/react"
import { RiArrowRightLine } from "react-icons/ri"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import HeartRain from './hearts-animation/HeartRain';


export default function Home() {
  const router = useRouter();
  const [currAdjIndex, setCurrAdjIndex] = useState(0);

  const adjectives = ["beautiful", "lovely", "amazing", "wonderful", "gorgeous", "stunning", "radiant", "charming", "enchanting", "captivating", "fantabulous", "breathtaking", "divine", "elegant", "graceful", "magnificent", "marvelous", "splendid", "stunning"];

  useEffect(() => {
    const changeAdjective = () => {
      setCurrAdjIndex((prevIndex) => (prevIndex + 1) % adjectives.length);
    }

    const intervalId = setInterval(changeAdjective, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <HeartRain />
      <Center h="100vh" bgColor="pink.100">
        <VStack gap="4rem">
          <h1 className='!font-sans !text-3xl !font-bold'>Welcome Mili, my {adjectives[currAdjIndex]} girlfriend!</h1>
          <p className='!font-serif !text-lg !italic'>It's been a while since we have seen each other and I would like to see you soon! Click the button below to get started.</p>
          <Button colorPalette="pink" variant="solid" onClick={() => router.push('/scheduler')}>
            Let's go! <RiArrowRightLine />
          </Button>
        </VStack>
      </Center>
    </div>
  );
}