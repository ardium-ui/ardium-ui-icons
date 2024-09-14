const fs = require("fs");

const pathRounded = "../raw/rounded";
const pathFilled = "../raw/rounded";
const fileNames = [fs.readdirSync(pathRounded), fs.readdirSync(pathFilled)]
  .flat()
  .filter((name) => name.endsWith(".svg"));

let changedAmount = 0;
for (const fileName of fileNames) {
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

if (changedAmount) {
  console.log(
    `Finished cleaning up ${fileNames.length} files (changed ${changedAmount})`
  );
} else {
  console.log("All files were clean. Nothing to do.");
}
