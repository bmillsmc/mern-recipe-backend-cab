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
        console.log(req.origi);
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
  getRecipe: (req, res) => {
    Fridge.find({ user: req.params.user }).then(fridge => {
      let recipe = Recipe.findOne({ name: req.params.recipe });
      if (fridge.recipes.includes(recipe)) {
        res.json(recipe);
      } else {
        res.json({
          error: "recipe not stored in fridge"
        });
      }
    });
  },
  getIngredients: (req, res) => {},
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
