const { Recipe, Ingredient } = require("../../models");
const recipeData = require("../../data/sample_json.json"); //to make this useable make sure you find and replace all of the single quotes surrounding the array elements with double quotes and then remove the double quotes around the arrays

//transform data from dataset to object matching model

const recipeObjects = recipeData.map(recipe => {
  recipeOb = {
    name: recipe.name,
    minutes: recipe.minutes,
    steps: recipe.steps
  };
  recipeOb.ingredients = recipe.ingredients.map(ingredient => {
    ingredientOb = {
      name: ingredient,
      type: "unused"
    };
    return ingredientOb;
  });
  return recipeOb;
});

async function seedCollections() {
  for (const recipe of recipeObjects) {
    const document = await Recipe.create(recipe);
    console.log(document);
    for (const ingredient of recipe.ingredients) {
      console.log(ingredient);
      const ingreDocument = await Ingredient.create(ingredient);
      console.log(ingreDocument);
    }
  }
}
Recipe.deleteMany({}).then(() => {
  Ingredient.deleteMany({}).then(() => {
    seedCollections();
  });
});
