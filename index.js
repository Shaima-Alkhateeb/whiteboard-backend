'use strict';

require('dotenv').config();
const server = require('./server');
const { db } = require('./models/index')

db.sync().then(() => {
    server.start(process.env.PORT || 4000);
}).catch(console.error)

// db.sync({force: true}).then(() => {