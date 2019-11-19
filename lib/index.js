const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const router = require("./routes");

app.use(parser);
app.use(cors);
app.use(router);
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("PORT: " + `${app.get("port")}`);
});
