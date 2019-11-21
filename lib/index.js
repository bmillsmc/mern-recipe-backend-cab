
const express = require("express");
const app = express();
const parser = require("body-parser");
const paginate = require("express-paginate");
const cors = require("cors");
const router = require("./routes");
const passport = require('./config/passport')()
const config = require('./config/config')
const userController = require('./controllers/user');

app.use(parser.json());
app.use(paginate.middleware(10, 50));
app.use(cors());

app.use(router);

app.use(passport.initialize())

app.get("/", (req, res) => {
  res.json({
    Recipe: req.protocol + "://" + req.get("host") + "/recipe",
    Ingredient: req.protocol + "://" + req.get("host") + "/ingredient",
    Fridge: req.protocol + "://" + req.get("host") + "/fridge",
    User: req.protocol + "://" + req.get("host") + "/users"
  });
});

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log("PORT: " + `${app.get("port")}`);
});
