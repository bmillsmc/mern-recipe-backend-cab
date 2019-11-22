const { Recipe, Ingredient, Fridge } = require("../../models");
//do not run this file, I repeat DO NOT RUN THIS FILE if there is already something in the fridge db. ALL DATA WILL BE LOST
Fridge.deleteMany({}).then(async () => {
  let ingredientAr = await Ingredient.find().limit(10);
  let recipeAr = await Recipe.find().limit(5);
  let ingredientAr2 = await Ingredient.find().limit(21);
  let recipeAr2 = await Recipe.find().limit(11);
  Fridge.create([
    {
      user: "example1",
      ingredients: ingredientAr,
      recipes: recipeAr
    },
    {
      user: "example2",
      ingredients: ingredientAr2,
      recipes: recipeAr2
    }
  ])
    .then(fridges => {
      console.log(fridges);
    })
    .catch(err => console.log(err));
});

//do not run this file, I repeat DO NOT RUN THIS FILE if there is already something in the fridge db. ALL DATA WILL BE LOST
