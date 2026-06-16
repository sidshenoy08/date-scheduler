'use client'

import { Button, VStack, Center, HStack } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import TextTransition, { presets } from 'react-text-transition';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import HeartRain from './hearts-animation/HeartRain';


export default function Home() {
  const router = useRouter();
  const [currAdjIndex, setCurrAdjIndex] = useState(0);
  const [currMsgIndex, setCurrMsgIndex] = useState(0);

  const adjectives = ["beautiful", "lovely", "amazing", "wonderful", "gorgeous", "stunning", "radiant", "charming", "enchanting", "captivating", "fantabulous", "breathtaking", "divine", "elegant", "graceful", "magnificent", "marvelous", "splendid", "stunning"];

  const messages = ["It's been a while since we have seen each other and I would like to see you soon! Click the button below to get started.", "Please go out with me", "Pretty pleaseeeeeeeeeeeee", "We can go wherever and do whatever you like, I promise", "I am begging you say yes, my love", "Ok, I am starting to get annoyed now. Say yes before I change my mind", "This is the last time I am asking you, I don't want to go anyways now", "Hah! You thought you had a choice!"]

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
          <h1 className='!font-sans !text-3xl !font-bold'>Welcome Mili, my <TextTransition inline={true} springConfig={presets.molasses}>{adjectives[currAdjIndex]}</TextTransition> girlfriend!</h1>
          <TextTransition inline={true} springConfig={presets.slow}>
            <p className='!font-serif !text-lg !italic'>
              {messages[currMsgIndex]}
            </p>
          </TextTransition>
          {!(currMsgIndex === messages.length - 1) ? <HStack>
            <Button colorPalette="pink" variant="solid" onClick={() => router.push('/scheduler')}>
              Let's go! <RiArrowRightLine />
            </Button>
            <Button colorPalette="red" variant="solid" onClick={() => setCurrMsgIndex((prevIndex) => prevIndex + 1)}>
              Not interested! <TiCancel />
            </Button>
          </HStack> : <Button colorPalette="pink" variant="solid" onClick={() => router.push('/scheduler')}>
            Let's go! <RiArrowRightLine />
          </Button>}
        </VStack>
      </Center>
    </div>
  );
}