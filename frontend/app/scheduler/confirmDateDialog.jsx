import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { IconButton, Spinner, Box, Center } from "@chakra-ui/react";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";

import { useState, forwardRef, useEffect } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmDateDialog({ open, setOpen, selectedDate, selectedTime, activities }) {
    const [scheduling, setScheduling] = useState(false);
    const [userTimezone, setUserTimezone] = useState('');

    useEffect(() => {
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUserTimezone(localTimezone);
    }, []);

    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
    };

    const submitPlan = async () => {
        setScheduling(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: selectedDate,
                    time: selectedTime,
                    timezone: userTimezone,
                    activities: activities
                })
            });

            if (!response.ok) {
                throw new Error(`Something went wrong: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            if (result.status === "success") {
                router.push("/confirmation");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setScheduling(false);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                role="alertdialog"
                sx={{
                    '& .MuiDialogTitle-root': {
                        backgroundColor: '#8DFFEB',
                        color: 'white',
                        fontWeight: 'bold',
                    },
                    '& .MuiDialogContent-root': {
                        padding: 4,
                        backgroundColor: '#FF8DA1',
                    },
                    '& .MuiDialogActions-root': {
                        padding: 2,
                        borderTop: '1px solid #e0e0e0',
                    },
                }}
            >
                <DialogTitle>{"Planned Date Summary"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="date">
                        Date Selected: {selectedDate ? selectedDate.toLocaleString() : "None"}
                    </DialogContentText>
                    <DialogContentText id="time">
                        Time to meet: {selectedTime ? `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')}` : "None"}
                    </DialogContentText>
                    <DialogContentText id="activities">
                        Activities planned: {activities.length > 0 ? activities.join(", ") : "None"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton aria-label="Search database" rounded="full" onClick={handleClose} variant="ghost" colorPalette="red">
                        <GiCancel />
                    </IconButton>
                    <IconButton aria-label="Search database" rounded="full" onClick={submitPlan} variant="subtle" colorPalette="pink">
                        <GiConfirmed />
                    </IconButton>
                </DialogActions>
            </Dialog>
            {scheduling ? <Box pos="absolute" zIndex={9999} inset="0" bg="bg/80">
                <Center h="full">
                    <Spinner color="teal.500" size="xl" />
                </Center>
            </Box> : <></>}
        </React.Fragment>
    );
}

export default ConfirmDateDialog;