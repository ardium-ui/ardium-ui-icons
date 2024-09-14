const fs = require("fs");

module.exports = function (fileNames) {

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
    if (startContent !== content) {
      fs.writeFileSync(path + fileName, content, { encoding: "utf-8" });
      changedAmount++;
    }
  }

  return changedAmount;
};
