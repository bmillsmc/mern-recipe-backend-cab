const { Ingredient } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: async (req, res, next) => {
    try {
      const [results, itemCount] = await Promise.all([
        Ingredient.find({})
          .limit(req.query.limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Ingredient.countDocuments({})
      ]);

      const pageCount = Math.ceil(itemCount, req.query.limit);
      let fullUrl;
      if (req.originalUrl === "/ingredient") {
        fullUrl =
          req.protocol + "://" + req.get("host") + req.originalUrl + "?page=2";
      } else {
        let newPage = req.originalUrl.split("");
        newPage[newPage.length - 1] =
          parseInt(newPage[newPage.length - 1], 10) + 1;
        newPage = newPage.join("");
        fullUrl = req.protocol + "://" + req.get("host") + newPage;
      }
      res.json({
        object: "10 ingredients",
        has_more: paginate.hasNextPages(req)(pageCount),
        next_page: fullUrl,
        data: results
      });
    } catch (err) {
      next(err);
    }
  },
  showIngredient: (req, res) => {
    Ingredient.find({ name: req.params.name }).then(ingredient => {
      res.json(ingredient);
    });
  },
  create: (req, res) => {
    Ingredient.create(req.body).then(ingredient => {
      res.json(ingredient);
    });
  },
  edit: (req, res) => {
    Ingredient.findOneAndUpdate({ name: req.params.name }, req.body, {
      new: true
    }).then(ingredient => {
      res.json(ingredient);
    });
  },
  delete: (req, res) => {
    Ingredient.findOneAndDelete({ name: req.params.name }).then(ingredient => {
      res.json(ingredient);
    });
  }
};
