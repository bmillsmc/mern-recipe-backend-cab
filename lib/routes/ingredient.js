const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredient");

router.get("/ingredient", ingredientController.index);
router.get("/ingredient/:name", ingredientController.showIngredient);
router.post("ingredient", ingredientController.create);
router.put("/ingredient/:name", ingredientController.edit);
router.delete("/ingredient/:name", ingredientController.delete);
