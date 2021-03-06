const express = require("express");
const router = express.Router();
const fridgeController = require("../controllers/fridge");

router.get("/fridge", fridgeController.index);
router.get("/fridge/:user", fridgeController.getFridge);
router.get("/fridge/:user/recipes", fridgeController.getRecipes);
router.get("/fridge/:user/recipes/:recipe", fridgeController.getRecipe);
router.get("/fridge/:user/ingredients", fridgeController.getIngredients);
router.get(
  "/fridge/:user/ingredients/:ingredient",
  fridgeController.getIngredient
);
router.post("/fridge/", fridgeController.addFridge); //works
router.put("/fridge/:user", fridgeController.editFridge); //works
router.put("/fridge/:user/ingredients", fridgeController.addIngredient); //works
router.put("/fridge/:user/recipes", fridgeController.addRecipe); //works
router.delete("/fridge/:user", fridgeController.deleteFridge);
router.put(
  "/fridge/:user/ingredients/:ingredient",
  fridgeController.deleteIngredient
);
router.put("/fridge/:user/recipes/:recipe", fridgeController.deleteRecipe);

module.exports = router;
