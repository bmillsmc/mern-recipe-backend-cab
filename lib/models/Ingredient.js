const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  type: {
    type: String
    //enum? where is this type coming from
  },
  name: String
});

module.exports = ingredientSchema;
