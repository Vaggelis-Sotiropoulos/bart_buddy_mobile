'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 1337;
const twilio = require('./workers/twilio');
const trains = require('./routes/train_data.js');
const update = require('./routes/update_schedule.js');

app.listen(PORT, () => {
    console.log(`Bart Buddy listening on port ${PORT}!`);
});