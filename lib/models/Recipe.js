const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const ingredientSchema = require("./Ingredient");

const recipeSchema = new Schema({
  ingredients: [ingredientSchema],
  name: {
    type: String,
    unique
  },
  minutes: Number,
  steps: [String]
});

module.exports = recipeSchema;
