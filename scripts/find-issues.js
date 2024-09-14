const fs = require("fs");

const findProblems = function (fileNames) {
  const oldFileNames = {};
  const comments = {};
  const titles = {};
  const ids = {};
  const strokes = {};
  const fills = {};
  const displayNones = {};
  const st1s = {};
  const images = {};
  const nonBlacks = {};
  const noSt0s = {};
  for (const { path, fileName } of fileNames) {
    const content = fs.readFileSync(path + fileName, "utf-8");

    if (fileName.match(/^[A-Z]/) && !fileName.match(/TEMPLATE/)) {
      oldFileNames[fileName] = [fileName];
    }

    if (!content.match('.st0')) {
      noSt0s[fileName] = [fileName];
    }

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
      ?.map((v) => v.match(/id="(.+?)"/)[1]);
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

    if (!path.match("filled")) {
      const foundFills = content
        .match(/fill=".+?"/g)
        ?.map((v) => v.match(/fill="(.+?)"/)[1])
        .filter((v) => !v.match(/^none$/));
      if (foundFills?.length) {
        fills[fileName] = foundFills;
      }
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

    const foundNonBlacks = content.match(/#[0-9a-f]{6}/g)?.filter(v => v !== '#000000');
    if (foundNonBlacks?.length) {
      nonBlacks[fileName] = foundNonBlacks;
    }
  }
  return {
    oldFileNames,
    noSt0s,
    comments,
    titles,
    ids,
    strokes,
    fills,
    displayNones,
    st1s,
    images,
    nonBlacks,
  };
};

module.exports = {
  findProblems,
  numberOfProblems: function (fileNamesOrProblems) {
    const problems = Array.isArray(fileNamesOrProblems)
      ? findProblems(fileNamesOrProblems)
      : fileNamesOrProblems;

    const noOfProblems = Object.values(problems)
      .map((v) => Object.values(v))
      .flat()
      .flat();

    return noOfProblems.length;
  },
};
