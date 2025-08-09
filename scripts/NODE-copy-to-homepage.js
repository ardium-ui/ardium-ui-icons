const fs = require("fs");

fs.cpSync("../raw", "../projects/homepage/src/assets/icons", {
  recursive: true,
  filter: (src) => {
    return src.endsWith(".svg");
  },
});

console.log('copied!');