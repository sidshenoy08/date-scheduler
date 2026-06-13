import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

// const express = require('express');
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

// const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


app.post('/api/schedule', async (req, res) => {
    const unformattedDate = req.body.date[0];
    const unformattedTime = req.body.time;
    const activities = req.body.activities;

    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const startDateTime = new Date(
        unformattedDate.year,
        unformattedDate.month - 1,
        unformattedDate.day,
        unformattedTime.hour,
        unformattedTime.minute
    ).toISOString();

    const endDateTime = new Date(
        unformattedDate.year,
        unformattedDate.month - 1,
        unformattedDate.day,
        23,
        59
    ).toISOString();

    const auth = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
        'summary': 'Date with Mili',
        'location': 'Mili\'s place',
        'description': `Planned activities: ${activities.join(", ")}`,
        'start': {
            'dateTime': startDateTime,
            'timeZone': tzName
        },
        'end': {
            'dateTime': endDateTime,
            'timeZone': tzName
        },
        'attendees': [
            { 'email': 'milipatel1041@gmail.com' },
            { 'email': 'sidshenoy2000@gmail.com' }
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 },
            ]
        }
    };

    try {
        const response = await calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all'
        });

        console.log("Date has been added successfully!");

        res.json({
            status: "success",
            eventLink: response.data.eventLink
        });
    } catch (err) {
        console.log(`There was an error: ${err}`);
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});