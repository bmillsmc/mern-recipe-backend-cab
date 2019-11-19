const { Recipe } = require("../models");
const paginate = require("express-paginate");

module.exports = {
  index: async (req, res, next) => {
    try {
      const [results, itemCount] = await Promise.all([
        Recipe.find({})
          .limit(req.query.limit)
          .skip(req.skip)
          .lean()
          .exec(),
        Recipe.countDocuments({})
      ]);

      const pageCount = Math.ceil(itemCount, req.query.limit);
      let fullUrl;
      if (req.originalUrl === "/recipe") {
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
        object: "10 recipes",
        has_more: paginate.hasNextPages(req)(pageCount),
        next_page: fullUrl,
        data: results
      });
    } catch (err) {
      next(err);
    }
  },
  showRecipe: (req, res) => {
    Recipe.find({ name: req.params.name }).then(recipe => {
      res.json(recipe);
    });
  },
  create: (req, res) => {
    Recipe.create(req.body).then(recipe => {
      res.json(recipe);
    });
  },
  edit: (req, res) => {
    Recipe.findOneAndUpdate({ name: req.params.name }, req.body, {
      new: true
    }).then(recipe => {
      res.json(recipe);
    });
  },
  delete: (req, res) => {
    Recipe.findOneAndDelete({ name: req.params.name }).then(recipe => {
      res.json(recipe);
    });
  }
};
