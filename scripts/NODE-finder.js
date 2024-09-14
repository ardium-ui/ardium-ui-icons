const fs = require("fs");
const fsExtra = require("fs-extra");
const { OK_STR, ERR_STR } = require("./ansis.js");

const fileNames = require("./file-getter.js")();
const problems = require("./find-issues.js").findProblems(fileNames);
const noOfProblems = require("./find-issues.js").numberOfProblems(problems);

const outPath = "./out/";

fsExtra.ensureDirSync(outPath);

for (const key in problems) {
  const value = problems[key];

  fs.writeFileSync(outPath + key + ".json", JSON.stringify(value, null, 2));
}

console.log(`${OK_STR} Finished analyzing ${fileNames.length} files.`);
console.log(
  `${noOfProblems ? ERR_STR : OK_STR} ${noOfProblems} problems found.`
);
