'use client'

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {
    Box,
    VStack,
    Text 
} from "@chakra-ui/react";
import Image from "next/image";
import { Heading } from "@chakra-ui/react"

function Confirmation() {
    return (
        <Box
            w="100vw"
            h="100vh"
            bgColor="pink.50"
            flexShrink={0}
            overflowY="auto"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            px="6"
            py="6"
        >
            <VStack gap="5" alignItems="center">
                <Alert sx={{ marginTop: '2%', width: 'fit-content', maxWidth: '90vw', borderRadius: 'md' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Our date has been confirmed! You have received a google calendar invite with the details!
                </Alert>
                <VStack gap="2">
                    <Heading
                        size="3xl"
                        letterSpacing="tight"
                    >
                        Me waiting for our date
                    </Heading>

                    <Text color="fg.muted" fontSize="lg">
                        Wondering what I should do in the meantime?
                    </Text>
                </VStack>
                <Box
                    bg="white"
                    p="4"
                    rounded="2xl"
                    shadow="lg"
                    borderWidth="1px"
                    borderColor="pink.100"
                >
                    <Image
                        src="/mili.png"
                        loading="eager"
                        alt="Mili"
                        width={400}
                        height={400}
                        style={{
                            width: "auto",
                            height: "auto",
                            maxWidth: "80vw",
                            borderRadius: "16px",
                        }}
                    />
                </Box>
            </VStack>
        </Box>
    );
}

export default Confirmation;