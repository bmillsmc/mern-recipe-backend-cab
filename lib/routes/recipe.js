const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe");

router.get("/recipe", recipeController.index);
router.get("/recipe/:name", recipeController.showRecipe);
router.post("/recipe", recipeController.create);
router.put("/recipe/:name", recipeController.edit);
router.delete("/recipe/:name", recipeController.delete);

module.exports = router;
