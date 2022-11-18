"use strict";

const { userModel } = require("../models/index");
// const User = require('../models').userModel;

const bearerAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    next("You are not Authorized");
  }
  console.log("req.headers.authorization", req.headers.authorization);
  const token = req.headers.authorization.split(' ').pop();

  try {
    const validUser = await userModel.authenticateToken(token);
    const userInfo = await userModel.findOne({
      where: { userName: validUser.userName },
    });
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token;
      next();
    } else {
      next("Invalid Login");
    }
  } catch (error) {
    next("Invalid Login");
  }
};

module.exports = bearerAuth;
