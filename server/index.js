'use strict';
const app = require('./app');
const db = require('../db');
const update = require('./routes/update_schedule.js');
const trains = require('./routes/train_data.js');
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
    console.log(`Bart Buddy listening on port ${PORT}!`);
});