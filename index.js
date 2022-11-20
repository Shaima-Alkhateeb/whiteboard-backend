'use strict';

require('dotenv').config();
const server = require('./server');
const { db } = require('./models/index')

db.sync().then(() => {
    server.start(process.env.PORT || 4000);
}).catch(console.error)

//if I went to update the database
// db.sync({force: true})