/** @format */

import { User } from "./user.model";
import moment from "moment";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { v4 as uuidv4 } from "uuid";
import { ResetToken } from "./reset-tokens.model";


var jwt = require("jsonwebtoken");
var Boom = require("@hapi/boom");
var bcrypt = require("bcryptjs");

export const validateAccessToken = async (
  decodedJwt,
  request: Request,
  h: ResponseToolkit
) => {
  console.log({decodedJwt});

  const findUser = await User.findById(decodedJwt._id);

  console.log({findUser})

  const user = findUser.toObject();
  if (!user) {
    return {
      isValid: false,
      response: h
        .response({ message: "Credentials Invalid, Login again." })
        .code(403),
    };
  } else if (!user.isActive) {
    return {
      isValid: false,
      response: h
        .response({ message: "Your account has been deactivated" })
        .code(403),
    };
  }

  return { isValid: true, credentials: decodedJwt };
};

export const generateHashedPassword = (password:string) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

export const verifyPassword = async (password, plainPassword): Promise<any> => {
  if (!password) {
    return false;
  }
  return await bcrypt.compare(plainPassword, password);
};

export const generateAccessToken = (data) => {
  try {
    return jwt.sign(data, process.env.JWT_SECRET, {
      algorithm: "HS256",
      // expiresIn: process.env.JWT_EXPIRATION,
    });
  } catch (err) {
    throw Boom.badImplementation("terrible implementation", err);
  }
};

