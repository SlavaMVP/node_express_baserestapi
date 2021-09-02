const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, surname, email, password, country, city, address } = req.body;
  bcrypt

    .hash(password, 12)
    .then((hPassword) => {
      const user = new User({
        name,
        surname,
        email,
        password: hPassword,
        country,
        city,
        address,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created!", userId: result[0].insertId });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  let userData;
  const { email, password } = req.body;

  User.getUser(email)
    .then(([user]) => {
      userData = user[0];

      return bcrypt.compare(password, userData.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: userData.email,
          userId: userData.client_id,
        },
        "somesectettext",
        { expiresIn: "1h" }
      );
      res.status(201).json({
        token: token,
        userId: userData.client_id,
        email: userData.email,
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserInfo = (req, res, next) => {
  const { email } = req.query;

  User.getUser(email)
    .then(([data]) => {
      res.status(200).json({
        message: "Fetched user successfully",
        data,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
