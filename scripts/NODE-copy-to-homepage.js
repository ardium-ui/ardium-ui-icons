const fs = require("fs");

const destPath  = "../projects/homepage/src/assets/icons";

if (fs.existsSync(destPath)) {
  fs.rmSync(destPath, { recursive: true });
  fs.mkdirSync(destPath, { recursive: true });

  console.log(`Cleared existing icons folder`);
}

fs.cpSync("../raw", destPath, {
  recursive: true,
  filter: (src) => {
    return src.endsWith(".svg");
  },
});

console.log("Copied!");
