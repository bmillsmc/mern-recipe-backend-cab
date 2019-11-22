const mongoose = require("../db/connection");
const Schema = mongoose.Schema;
const recipeSchema = require("./Recipe");
const ingredientSchema = require("./Ingredient");

const fridgeSchema = new Schema({
  user: {
    type: String,
    unique: true
  },
  ingredients: [ingredientSchema],
  recipes: [recipeSchema]
});

module.exports = fridgeSchema;
