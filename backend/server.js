import path from 'node:path';
import process from 'node:process';
// import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';

import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


app.post('/api/schedule', async (req, res) => {
    const unformattedDate = req.body.date[0];
    const unformattedTime = req.body.time;
    const timezone = req.body.timezone;
    const activities = req.body.activities;

    console.log(timezone);

    // const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

    // const auth = await authenticate({
    //     scopes: SCOPES,
    //     keyfilePath: CREDENTIALS_PATH,
    // });

    const authClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    authClient.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        // scope: SCOPES
    });

    await authClient.getAccessToken();

    // const auth = new google.auth.GoogleAuth({
    //     credentials: {
    //         client_email: process.env.GOOGLE_CLIENT_EMAIL,
    //         private_key: process.env.GOOGLE_CLIENT_KEY.replace(/\\n/g, '\n')
    //     },
    //     scopes: SCOPES
    // });

    const calendar = google.calendar({ version: 'v3', auth: authClient });

    const event = {
        'summary': 'Date with Mili',
        'location': 'Mili\'s place',
        'description': `Planned activities: ${activities.join(", ")}`,
        'start': {
            'dateTime': startDateTime,
            'timeZone': timezone
        },
        'end': {
            'dateTime': endDateTime,
            'timeZone': timezone
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
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all'
        });

        console.log("Date has been added successfully!");

        res.json({
            status: "success",
            eventLink: response.data.htmlLink
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