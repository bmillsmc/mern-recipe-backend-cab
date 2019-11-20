const { Fridge, Ingredient, Recipe } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: (req, res) => {},
  getFridge: (req, res) => {},
  getRecipe: (req, res) => {},
  getIngredient: (req, res) => {},
  addFridge: (req, res) => {},
  editFridge: (req, res) => {},
  editFridgeIngredients: (req, res) => {},
  addIngredient: (req, res) => {},
  editRecipes: (req, res) => {},
  addRecipe: (req, res) => {},
  deleteFridge: (req, res) => {},
  deleteIngredient: (req, res) => {},
  deleteRecipe: (req, res) => {}
};
