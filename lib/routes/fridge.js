const express = require("express");
const router = express.Router();
const fridgeController = require("../controllers/fridge");

router.get("/fridge", fridgeController.index);
router.get("/fridge/:user", fridgeController.getFridge);
router.post("/fridge/", fridgeController.newFridge);
router.put("/fridge/:user", fridgeController.editFridge);
router.put("/fridge/:user/ingredients", fridgeController.editFridgeIngredients);
router.delete("/fridge/:user", fridgeController.deleteFridge);

module.exports = router;
