const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { OK_STR, ERR_STR } = require("./ansis.js");

const destProject = "../projects/icon-data-tool";
const destPath = path.join(destProject, "public/icons");
const outFilePath = path.join(destProject, "src/app/data/icon-list.ts");
const existingInFilePath =
  "../projects/homepage/src/app/services/icon-storage/icon-data.ts";
  const existingOutFilePath = path.join(destProject, "src/app/data/existing-icon-data.ts");

fsExtra.ensureDirSync(destPath);

try {
  fs.cpSync("../raw", destPath, {
    recursive: true,
    filter: (src) => {
      return !src.endsWith(".ai");
    },
  });
} catch (error) {
  console.log(ERR_STR, "Error copying icon SVG files:", error);
}

try {
  const folders = fs.readdirSync(destPath);

  const outData = {};
  let totalIcons = 0;

  for (const folder of folders) {
    const folderPath = path.join(destPath, folder);
    const icons = fs.readdirSync(folderPath);

    console.log(`${OK_STR} Copied ${icons.length} ${folder} icons`);

    const outArray = icons
      .filter((icon) => icon.endsWith(".svg"))
      .map((icon) => icon.replace(".svg", ""));

    outData[folder] = outArray;
    totalIcons += outArray.length;
  }

  console.log(
    `${OK_STR} Written icon list containing ${totalIcons} icons items`
  );

  const outFileContent = `export const ICON_LIST = ${JSON.stringify(
    outData
  )};\n`;

  fs.writeFileSync(outFilePath, outFileContent);
} catch (error) {
  console.log(`${ERR_STR} Error reading icon folders:`, error);
}

try {
  fs.cpSync(existingInFilePath, existingOutFilePath);
  console.log(`${OK_STR} Copied icon-data.ts file`);
} catch (error) {
  console.log(`${ERR_STR} Error copying icon-data.ts file:`, error);
}
