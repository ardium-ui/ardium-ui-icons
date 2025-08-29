const fs = require("fs");
const { OK_STR, ERR_STR } = require("./ansis.js");

const performCleanup = function (fileNames) {
  let changedAmount = 0;
  for (const { path, fileName } of fileNames) {
    let content = fs.readFileSync(path + fileName, "utf-8");
    const startContent = content;

    const foundComments = content.match(/<!--.+?-->/gs);
    if (foundComments) {
      content = content.replace(/<!--.+?-->\n?/gs, "");
    }

    const foundXml = content.match(/<\?xml.+?\?>/gs);
    if (foundXml) {
      content = content.replace(/<\?xml.+?\?>\n*/g, "");
    }

    const foundSt1s = content.match(/\.st[1-9]/g);
    if (foundSt1s) {
      content = content.replace(/\s*\.st[1-9]\{.+?\}\s*/g, "");
      content = content.replace(/class="st[1-9]"/g, 'class="st0"');
    }

    const addedSt0s = content.match(/<(path|circle|rect)(?![^>]+class)/g);
    if (addedSt0s) {
      content = content.replace(
        /<(path|circle|rect)(?![^>]+class)/g,
        '<$1 class="st0"'
      );
    }

    const foundImages = content.match(/<image/g);
    if (foundImages) {
      content = content.replace(
        /(\u000d\n)?<image.+?(\u000d\n)?.*?>(\u000d\n)?<\/image>/g,
        ""
      );
    }

    const foundNewlines = content.match(/\u000d\n(\u000d\n)+/g);
    if (foundNewlines) {
      content = content.replace(/\u000d\n(\u000d\n)+/g, "");
    }

    const foundNonBlacks = content.match(/#[0-9a-f]{6}/g);
    if (foundNonBlacks) {
      content = content.replace(/#[0-9a-f]{6}/g, "#000000");
    }

    // write to file
    if (startContent !== content) {
      fs.writeFileSync(path + fileName, content, { encoding: "utf-8" });
      changedAmount++;
    }
  }

  return changedAmount;
};

module.exports = {
  performCleanup,
  cleanupWithConsole: function (fileNames) {
    const problems = require("./find-issues.js").numberOfProblems(fileNames);

    if (!problems) {
      console.log(`${OK_STR} No problems found in files.`);
      return true;
    }

    console.log(`${OK_STR} Found ${problems} problems.`);
    const changedAmount = performCleanup(fileNames);

    if (!changedAmount) {
      console.log(
        `${ERR_STR} Couldn't cleanup any files. ${problems} problems remain.`
      );
      return false;
    }

    console.log(`${OK_STR} Cleaned up ${changedAmount} files.`);
    const remainingProblems =
      require("./find-issues.js").numberOfProblems(fileNames);

    if (remainingProblems) {
      console.log(`${ERR_STR} ${remainingProblems} problems remain.`);
      return false;
    }
    console.log(`${OK_STR} No problems remain.`);
    return true;
  },
};
