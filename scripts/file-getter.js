const fs = require("fs");
const ansis = require("ansis");

module.exports = function () {
  const pathOutlined = "../raw/outlined/";
  const outlinedFiles = fs
    .readdirSync(pathOutlined)
    .map((v) => ({ path: pathOutlined, fileName: v }));

  const pathFilled = "../raw/filled/";
  const filledFiles = fs
    .readdirSync(pathFilled)
    .map((v) => ({ path: pathFilled, fileName: v }));
  const fileNames = [outlinedFiles, filledFiles]
    .flat()
    .filter((file) => file.fileName.endsWith(".svg"));

  console.log(
    `${ansis.bold.greenBright("✓")} Found ${
      outlinedFiles.length
    } outlined icons.`
  );
  console.log(
    `${ansis.bold.greenBright("✓")} Found ${filledFiles.length} filled icons.`
  );
  return fileNames;
};
