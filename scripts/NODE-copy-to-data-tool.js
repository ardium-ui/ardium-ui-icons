const fs = require("fs");

fs.cpSync("../raw", "../projects/icon-data-tool/public/icons", {
  recursive: true,
  filter: (src) => {
    return src.endsWith(".svg");
  },
});
