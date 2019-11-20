const mongoose = require("../db/connection");
const recipeSchema = require("./Recipe");
const ingredientSchema = require("./Ingredient");
const fridgeSchema = require("./Fridge");

module.exports = {
  Recipe: mongoose.model("Recipe", recipeSchema),
  Ingredient: mongoose.model("Ingredient", ingredientSchema),
  Fridge: mongoose.model("Fridge", fridgeSchema)
};
