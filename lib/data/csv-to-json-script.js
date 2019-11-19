const csv = require("csvtojson");
const fs = require("fs");

let csvFilePath =
  "/Users/bmillsmc/sei/projects/mern-recipe-backend-cab/lib/data/RAW_recipes.csv";
let inStream = fs.createReadStream(csvFilePath);
let outStream = fs.createWriteStream("./raw_recipe.json");

inStream.pipe(csv()).pipe(outStream);

//dont use this file do npm install -g csvtojson and use command $csvtojson source.csv > converted.json
