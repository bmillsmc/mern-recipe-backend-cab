const Users = require("../models/User");

//const { Users } = require("../models/User");

module.exports = {
    index: (res) => {
      Users.find({})
        .then(users => {
          res.json(users)
        })
    },
    showName: (req, res) => {
      Users.find({username: req.params.username})
        .then(users => {
          res.render(users)
        })
    },
    create: (req, res) => {
      Users.create(req.body)
        .then(users => {
          res.json(users)
        })
    },
    edit: (req, res) => {
      Users.findOneAndUpdate({username: req.params.username}, req.body)
        .then(users => {
          res.json(users)
        })
    },
    delete: (req, res) => {
      Users.delete({username: req.params.username})
        .then(users => {
          res.json(users)
        })
    }
  }