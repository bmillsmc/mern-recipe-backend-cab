const { Fridge, Ingredient, Recipe } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: async (req, res, next) => {
    try {
      const [results, itemCount] = await Promise.all([
        Fridge.find({})
          .limit(req.query.limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Fridge.countDocuments({})
      ]);
      const pageCount = Math.ceil(itemCount / req.query.limit);
      let fullUrl;
      if (req.originialUrl === "/fridge") {
        fullUrl =
          req.protocol + "://" + req.get("host") + req.originialUrl + "?page=2";
      } else {
        let newPage = req.originalUrl.split("");
        newPage[newPage.length - 1] =
          parseInt(newPage[newPage.length - 1], 10) + 1;
        newPage = newPage.join("");
        fullUrl = req.protocol + "://" + req.get("host") + newPage;
      }
      if (!paginate.hasNextPages(req)(pageCount)) {
        res.json({
          object: "fridges",
          has_more: paginate.hasNextPages(req)(pageCount),
          data: results
        });
      } else {
        res.json({
          object: "fridges",
          has_more: paginate.hasNextPages(req)(pageCount),
          next_page: fullUrl,
          data: results
        });
      }
    } catch (err) {
      next(err);
    }
  },
  getFridge: (req, res) => {
    Fridge.find({ user: req.params.user }).then(fridge => {
      res.json(fridge);
    });
  },
  getRecipes: async (req, res, next) => {
    let fridge = await Fridge.find({ user: req.params.user });
    async function paginateRecipes(fridge, req, res, next) {
      let recipeNames = await fridge[0].recipes.map(recipe => {
        return recipe.name;
      });
      try {
        const [results, itemCount] = await Promise.all([
          Recipe.find({ name: { $in: recipeNames } })
            .limit(req.query.limit)
            .skip(req.skip)
            .lean()
            .exec(),
          Recipe.find({ name: { $in: recipeNames } }).countDocuments({})
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        let fullUrl;
        if (req.originalUrl.endsWith("/recipes")) {
          fullUrl =
            req.protocol +
            "://" +
            req.get("host") +
            req.originalUrl +
            "?page=2";
        } else {
          let newPage = req.originalUrl.split("");
          newPage[newPage.length - 1] =
            parseInt(newPage[newPage.length - 1], 10) + 1;
          newPage = newPage.join("");
          fullUrl = req.protocol + "://" + req.get("host") + newPage;
        }
        if (!paginate.hasNextPages(req)(pageCount)) {
          res.json({
            object: "recipes",
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results
          });
        } else {
          res.json({
            object: "recipes",
            has_more: paginate.hasNextPages(req)(pageCount),
            next_page: fullUrl,
            data: results
          });
        }
      } catch (err) {
        next(err);
      }
    }
    paginateRecipes(fridge, req, res, next);
  },
  getRecipe: async (req, res) => {
    let fridge = await Fridge.findOne({ user: req.params.user });
    let recipe = await Recipe.findOne({ name: req.params.recipe });
    let filteredRec = fridge.recipes.filter(
      recip => recip.name === recipe.name
    );
    if (filteredRec.length !== 0) {
      res.json(recipe);
    } else {
      res.json({
        error: "recipe not stored in fridge"
      });
    }
  },
  getIngredients: async (req, res) => {
    Fridge.find({ user: req.params.user }).then(async fridge => {
      let ingredientNames = await fridge[0].ingredients.map(ingredient => {
        return ingredient.name;
      });
      try {
        const [results, itemCount] = await Promise.all([
          Ingredient.find({ name: { $in: ingredientNames } })
            .limit(req.query.limit)
            .skip(req.skip)
            .lean()
            .exec(),
          Ingredient.find({ name: { $in: ingredientNames } }).countDocuments({})
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        let fullUrl;
        if (req.originalUrl.endsWith("/ingredients")) {
          fullUrl =
            req.protocol +
            "://" +
            req.get("host") +
            req.originalUrl +
            "?page=2";
        } else {
          let newPage = req.originalUrl.split("");
          newPage[newPage.length - 1] =
            parseInt(newPage[newPage.length - 1], 10) + 1;
          newPage = newPage.join("");
          fullUrl = req.protocol + "://" + req.get("host") + newPage;
        }
        if (!paginate.hasNextPages(req)(pageCount)) {
          res.json({
            object: "ingredients",
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results
          });
        } else {
          res.json({
            object: "ingredients",
            has_more: paginate.hasNextPages(req)(pageCount),
            next_page: fullUrl,
            data: results
          });
        }
      } catch (err) {
        next(err);
      }
    });
  },
  getIngredient: async (req, res) => {
    let fridge = await Fridge.findOne({ user: req.params.user });
    let ingredient = await Ingredient.findOne({ name: req.params.ingredient });
    let filteredIng = fridge.ingredients.filter(
      ingre => ingre.name === ingredient.name
    );
    if (filteredIng.length !== 0) {
      res.json(ingredient);
    } else {
      res.json({
        error: "ingredient not stored in fridge"
      });
    }
  },
  addFridge: (req, res) => {
    Fridge.create(req.body).then(fridge => {
      res.json(fridge);
    });
  },
  editFridge: (req, res) => {
    Fridge.findOneAndUpdate({ user: req.params.user }, req.body, {
      new: true
    }).then(fridge => {
      res.json(fridge);
    });
  },
  addIngredient: (req, res) => {
    Fridge.findOneAndUpdate(
      { user: req.params.user },
      { $push: { ingredients: req.body } },
      { new: true }
    ).then(fridge => {
      res.json(fridge);
    });
  },
  addRecipe: (req, res) => {
    Fridge.findOneAndUpdate(
      { user: req.params.user },
      { $push: { recipes: req.body } },
      { new: true }
    ).then(fridge => {
      res.json(fridge);
    });
  },
  deleteIngredient: (req, res) => {
    Fridge.findOneAndUpdate(
      { user: req.params.user },
      { $pull: { ingredients: req.body } },
      { new: true }
    ).then(fridge => {
      res.json(fridge);
    });
  },
  deleteRecipe: (req, res) => {
    Fridge.findOneAndUpdate(
      { user: req.params.user },
      { $pull: { recipes: req.body } },
      { new: true }
    ).then(fridge => {
      res.json(fridge);
    });
  },
  deleteFridge: (req, res) => {
    Fridge.findOneAndDelete({ user: req.params.user }).then(fridge => {
      res.json(fridge);
    });
  }
};
