const { Fridge, Ingredient, Recipe } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: (req, res, next) => {
    try {
        const [results, itemCount] = await Promise.all([
            Fridge.find({}).limit(req.query.limit).skip(req.skip).lean().exec(), Fridge.countDocuments({})
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        let fullUrl;
        if(req.originialUrl === "/fridge"){
            fullUrl = req.protocol + "://" + req.get("host") + req.originialUrl + "?page=2";
        } else {
            let newPage = req.originalUrl.split("");
            newPage[newPage.length - 1] = parseInt(newpage[newPage.length - 1], 10) + 1;
            newPage = newPage.join("");
            fullUrl = req.protocol + "://" + req.get("host") + newPage;
        }
        if(!paginate.hasNextPages(req)(pageCount)) {
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
            })
        }
    } catch (err) {
      next(err);
    }
  },
  getFridge: (req, res) => {
      
  },
  getRecipe: (req, res) => {},
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
