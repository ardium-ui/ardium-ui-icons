const fs = require("fs")

fs.cpSync("../raw/filled", "../projects/homepage/src/assets/icons/filled", {
  recursive: true,
});
fs.cpSync("../raw/outlined", "../projects/homepage/src/assets/icons/outlined", {
  recursive: true,
});
