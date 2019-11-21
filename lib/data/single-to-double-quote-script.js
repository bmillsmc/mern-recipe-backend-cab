//parses a json file and looks for any strings with "[ at the start. parses those strings and replaces all single quotes ' with double quotes "
const json = require("./sample_json.json");
const JSONStream = require("JSONStream");
const fs = require("fs");

async function replace() {
  const newJson = json.map(jOb => {
    let keys = Object.keys(jOb);
    keys.forEach(key => {
      console.log("before: " + jOb[key]);
      let keyArray = jOb[key].split("");
      let newKeyArray = keyArray.map(item => {
        if (item === "'" && key !== "description" && key !== "steps") {
          item = '"';
          console.log("changed in " + key + " " + jOb.name);
        }
        return item;
      });
      jOb[key] = newKeyArray.join("");
      console.log("after: " + jOb[key]);
    });

    return jOb;
  });
  return newJson;
}

async function write() {
  let jsonNew = await replace();
  let transformStream = JSONStream.stringify();
  let writeStream = fs.createWriteStream(
    __dirname + "/double-quote-raw-json.json"
  );

  transformStream.pipe(writeStream);
  jsonNew.forEach(transformStream.write);
  transformStream.end();
}
write();
