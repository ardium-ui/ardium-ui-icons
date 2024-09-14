const { OK_STR } = require("./ansis.js");

const fileNames = require("./file-getter.js")();
const problems = require("./find-issues.js").findProblems(fileNames);
const noOfProblems = require("./find-issues.js").numberOfProblems(problems);

fs.mkdirSync("./out");

console.log(
  `${OK_STR} Finished analyzing ${fileNames.length} files. ${noOfProblems} problems found.`
);
