const fs = require("fs");
const fsExtra = require("fs-extra");
const { OK_STR, ERR_STR } = require("./ansis.js");

(async () => {
  const changeCase = await import("change-case");

  const fileNames = require("./file-getter.js")();

  const isOk = require("./cleanup.js").cleanupWithConsole(fileNames);
  if (!isOk) {
    process.exit(1);
  }

  const outPath = "../projects/icons/src/lib/";
  const outFilesCleared = fs.readdirSync(outPath).length;
  fsExtra.emptyDirSync(outPath);

  if (outFilesCleared) {
    console.log(
      `${OK_STR} Cleared ${outFilesCleared} files from out directory.`
    );
  } else {
    console.log(`${OK_STR} Out directory was empty.`);
  }

  fsExtra.ensureDirSync(outPath + "outlined/");
  fsExtra.ensureDirSync(outPath + "filled/");

  const exportLines = [];
  for (const { path, fileName } of fileNames) {
    let content = fs.readFileSync(path + fileName, "utf-8");

    const implicitTypeString = path.match("filled") ? "filled" : "";
    const typeString = implicitTypeString || "outlined";

    content = content.replace(
      /(\u000d\n)?<style.*?>(\u000d\n|.)+?<\/style>/g,
      ""
    );
    content = content.replace(
      /(\u000d\n|\s)*?(xmlns:xlink|xml:space)=".+?"/gi,
      ""
    );

    const nameWithoutExt = fileName.replace(".svg", "");
    const newFileName = fileName.replace(".svg", ".icon.ts");
    const selector =
      "ard-icon-" + changeCase.kebabCase(nameWithoutExt + implicitTypeString);
    const componentName =
      "ArdIcon" + changeCase.pascalCase(nameWithoutExt + implicitTypeString);

    exportLines.push(
      `export * from './lib/${typeString}/${newFileName.replace(".ts", "")}';`
    );

    const componentSrc = `import { Component } from '@angular/core';

@Component({
  selector: '${selector}',
  standalone: true,
  template: \`${content}\`,
  host: {
    class: 'ard-icon-${typeString}'
  }
})
export class ${componentName} {}
`;

    fs.writeFileSync(outPath + typeString + "/" + newFileName, componentSrc, {
      encoding: "utf-8",
    });
  }

  fs.writeFileSync(outPath + "../public-api.ts", exportLines.join("\n"), {
    encoding: "utf-8",
  });

  console.log(`${OK_STR} Finished converting ${fileNames.length} files`);

  process.exit(0);
})();
