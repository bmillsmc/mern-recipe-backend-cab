const mongoose = require("mongoose");
const recipeSchema = require("./Recipe");
const ingredientSchema = require("./Ingredient");

module.exports = {
  Recipe: mongoose.model("Recipe", recipeSchema),
  Ingredient: mongoose.model("Ingredient", ingredientSchema)
};
