'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');
const userRouter = require('./routes/user.routes')

require('dotenv').config();

// apllication level middleware
app.use(cors());
app.use(express.json());

app.use(postRouter);
app.use(commentRouter);
app.use(userRouter);

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

// Error handlers
app.use(errorHandler);
app.use(notFoundHandler);

function start(port) {
    app.listen(port || 4001 , () => console.log(`Server is starting on port ${port}`))
}

module.exports = {
    app, // app: app
    start // start: start
};