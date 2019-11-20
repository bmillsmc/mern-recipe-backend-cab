const express = require("express");
const router = express.Router();
const fridgeController = require("../controllers/fridge");

router.get("/fridge", fridgeController.index);
router.get("/fridge/:user", fridgeController.getFridge);
router.get("/fridge/:user/recipes/:recipe", fridgeController.getRecipe);
router.get(
  "/fridge/:user/ingredients/:ingredient",
  fridgeController.getIngredient
);
router.post("/fridge/", fridgeController.addFridge);
router.put("/fridge/:user", fridgeController.editFridge);
router.put("/fridge/:user/ingredients", fridgeController.editFridgeIngredients);
router.post("/fridge/:user/ingredients", fridgeController.addIngredient);
router.put("/fridge/:user/recipes", fridgeController.editRecipes);
router.post("/fridge/:user/recipes", fridgeController.addRecipe);
router.delete("/fridge/:user", fridgeController.deleteFridge);
router.delete(
  "/fridge/:user/ingredients/:ingredient",
  fridgeController.deleteIngredient
);
router.delete("/fridge/:user/recipes/:recipe", fridgeController.deleteRecipe);

module.exports = router;
