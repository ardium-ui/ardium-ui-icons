const fs = require("fs");
const fsExtra = require("fs-extra");
const { OK_STR, ERR_STR } = require("./ansis.js");

(async () => {
  const changeCase = await import("change-case");

  const fileNames = require("./file-getter.js")();

  const problems = require("./find-issues.js").numberOfProblems(fileNames);
  if (problems) {
    console.log(
      `${ERR_STR} Found ${problems} problems in files. Cannot continue.`
    );
  } else {
    console.log(`${OK_STR} No problems found in files.`);
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

  for (const { path, fileName } of fileNames) {
    let content = fs.readFileSync(path + fileName, "utf-8");

    content = content.replace(/(\u000d\n)?<style.*?>(\u000d\n|.)+?<\/style>/g, "");
    content = content.replace(/(\u000d\n|\s)*?(xmlns:xlink|xml:space)=".+?"/gi, "");

    const nameWithoutExt = fileName.replace(".svg", "");
    const newFileName = fileName.replace(".svg", ".icon.ts");
    const selector = "ard-icon-" + changeCase.kebabCase(nameWithoutExt);
    const componentName = "ArdIcon" + changeCase.pascalCase(nameWithoutExt);

    const componentSrc = `import { Component } from '@angular/core';

@Component({
  selector: '${selector}',
  standalone: true,
  template: \`${content}\`,
})
export class ${componentName} {}
`;

    fs.writeFileSync(outPath + newFileName, componentSrc, {
      encoding: "utf-8",
    });
  }

  console.log(`${OK_STR} Finished converting ${fileNames.length} files`);
})();
