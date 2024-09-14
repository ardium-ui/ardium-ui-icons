const fs = require("fs");

const path = "../raw/";
const fileNames = fs
  .readdirSync(path)
  .filter((name) => name.endsWith(".svg"));

const oldFileNames = [];
for (const fileName of fileNames) {
  if (fileName.match(/^[A-Z]/) && !fileName.match(/TEMPLATE/)) {
    oldFileNames.push(fileName);
  }
}
fs.writeFileSync("names.json", JSON.stringify(oldFileNames, null, 2));

let logged = false;
const comments = {};
const titles = {};
const ids = {};
const strokes = {};
const fills = {};
const displayNones = {};
const st1s = {};
const images = {};
for (const fileName of fileNames) {
  const content = fs.readFileSync(path + fileName, "utf-8");

  const foundComments = content.match(/<!--.+?-->/gs);
  if (foundComments) {
    comments[fileName] = foundComments;
  }

  const foundTitles = content.match(/<title>.+?<\/title>/gs);
  if (foundTitles) {
    titles[fileName] = foundTitles;
  }

  const foundIds = content
    .match(/id=".+?"/g)
    ?.map((v) => v.match(/id="(.+?)"/)[1])
  if (foundIds?.length) {
    ids[fileName] = foundIds;

    const newContent = content.replace(/\s*id=".+?"/g, "");
    fs.writeFileSync(path + fileName, newContent, { encoding: "utf-8" });
  }

  const foundStrokes = content
    .match(/stroke-width=".+?"/g)
    ?.map((v) => v.match(/stroke-width="(.+?)"/)[1])
    .filter((v) => !v.match(/^1.5$/));
  if (foundStrokes?.length) {
    strokes[fileName] = foundStrokes;
  }

  const foundFills = content
    .match(/fill=".+?"/g)
    ?.map((v) => v.match(/fill="(.+?)"/)[1])
    .filter((v) => !v.match(/^none$/));
  if (foundFills?.length) {
    fills[fileName] = foundFills;
  }

  const foundDisplayNones = content.match(/display:none/g);
  if (foundDisplayNones?.length) {
    displayNones[fileName] = foundDisplayNones;
  }

  const foundSt1s = content.match(/.st1/g);
  if (foundSt1s?.length) {
    st1s[fileName] = foundSt1s;
  }

  const foundImages = content.match(/<image/g);
  if (foundImages?.length) {
    images[fileName] = foundImages;
  }
}
fs.writeFileSync("comments.json", JSON.stringify(comments, null, 2));
fs.writeFileSync("titles.json", JSON.stringify(titles, null, 2));
fs.writeFileSync("ids.json", JSON.stringify(ids, null, 2));
fs.writeFileSync("strokes.json", JSON.stringify(strokes, null, 2));
fs.writeFileSync("fills.json", JSON.stringify(fills, null, 2));
fs.writeFileSync("displayNones.json", JSON.stringify(displayNones, null, 2));
fs.writeFileSync("st1s.json", JSON.stringify(st1s, null, 2));
fs.writeFileSync("images.json", JSON.stringify(images, null, 2));

console.log(`Finished analyzing ${fileNames.length} files`);
