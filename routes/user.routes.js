'use strict';

const express = require('express');
const router = express.Router();
// const router = require('express').Router();

const { signup, allUser, signin } = require('../controllers/userControllers');

const basicAuth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth')

router.post('/signup', basicAuth, signup)
router.get('/users', bearerAuth, allUser)
router.post('/signin', signin)

module.exports = router;