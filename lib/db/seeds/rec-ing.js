const { Recipe, Ingredient } = require("../../models");
const recipeData = require("../../data/sample_json.json"); //to make this useable make sure you find and replace all of the single quotes surrounding the array elements with double quotes and then remove the double quotes around the arrays

//transform data from dataset to object matching model
async function createObjects() {
  let nextIndex = 0;
  const recipeObjects = await recipeData.map(recipe => {
    recipeOb = {
      name: recipe.name,
      minutes: recipe.minutes,
      steps: recipe.steps
    };
    recipeOb.ingredients = recipe.ingredients.map((ingredient, index) => {
      console.log(index + ": " + ingredient);
      ingredientOb = {
        name: ingredient,
        type: "unused",
        index: nextIndex
      };
      nextIndex++;
      return ingredientOb;
    });
    return recipeOb;
  });
  console.log("------- created objects ------");
  return recipeObjects;
}

async function seedCollections(recipeObjects) {
  let ingredientNameArray = [];
  for (const recipe of recipeObjects) {
    const document = await Recipe.create(recipe).catch(err => console.log(err));
    console.log("-------recipe document start--------");
    console.log(document);
    console.log("-------recipe document end--------");
    for (const ingredient of recipe.ingredients) {
      if (!ingredientNameArray.includes(ingredient.name)) {
        ingredientNameArray.push(ingredient.name);
        const ingreDocument = await Ingredient.create(ingredient).catch(err =>
          console.log(err)
        );
        console.log("------ingredient document start---------");
        console.log(ingreDocument);
        console.log("-------ingredient document end--------");
      }
    }
  }
}

async function runFunctions() {
  let recipeObs = await createObjects();
  Recipe.deleteMany({}).then(() => {
    Ingredient.deleteMany({}).then(() => {
      seedCollections(recipeObs);
    });
  });
}

runFunctions();
