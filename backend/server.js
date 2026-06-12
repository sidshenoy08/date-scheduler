const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

app.post('/api/schedule', (req, res) => {
    const unformattedDate = req.body.date[0];
    const unformattedTime = req.body.time;
    const activities = req.body.activities;

    const dateTime = new Date (
        unformattedDate.year,
        unformattedDate.month - 1,
        unformattedDate.day,
        unformattedTime.hour,
        unformattedTime.minute
    ).toISOString();

    res.json({
        status: 'success'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});