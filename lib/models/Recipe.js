const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ingredientSchema = require("./Ingredient");

const recipeSchema = new Schema({
  ingredients: [ingredientSchema],
  name: String,
  minutes: Number,
  steps: [String]
});

module.exports = recipeSchema;
