const { User } = require("../models");
const express = require('express')
const router = express.Router();
const jwt = require('jwt-simple');
const passport = require('../config/passport');
const config = require('../config/config');


// router.post('/signup', (req, res) => {

module.exports = {
  index: (req, res) => {
    User.find({}).then(users => {
      res.json(users)
    })
  },
create: (req, res) => {
  if (req.body.email && req.body.password) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          User.create(newUser)
            .then(user => {
              if (user) {
                let payload = {
                  id: newUser.id
                }
                let token = jwt.encode(payload, config.jwtSecret)
                res.json({
                  token: token
                })
              } else {
                res.sendStatus(401)
              }
            })
        } else {
          res.sendStatus(401)
        }
      })
  } else {
    res.sendStatus(401)
  }
}
}