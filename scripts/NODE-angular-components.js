const fs = require("fs");
const fsExtra = require("fs-extra");
const { OK_STR, ERR_STR } = require("./ansis.js");

const outPath = "../projects/icons/src/lib/";
const publicApiPath = outPath + "../public-api.ts";

function createComponent(path, fileName, changeCase) {
  let content = fs.readFileSync(path + fileName, "utf-8");

  const implicitTypeString = path.match("filled") ? "filled" : "";
  const typeString = implicitTypeString || "outlined";

  content = content.replace(
    /(\u000d\n)?<style.*?>(\u000d\n|.)+?<\/style>/g,
    "",
  );
  content = content.replace(
    /(\u000d\n|\s)*?(xmlns:xlink|xml:space)=".+?"/gi,
    "",
  );

  const nameWithoutExt = fileName.replace(".svg", "");
  const newFileName = fileName.replace(".svg", ".icon.ts");
  const selector =
    "ard-icon-" +
    changeCase.kebabCase(`${nameWithoutExt} ${implicitTypeString}`);
  const componentName =
    "ArdIcon" +
    changeCase.pascalCase(`${nameWithoutExt} ${implicitTypeString}`);

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

  return `export * from './lib/${typeString}/${newFileName.replace(".ts", "")}';`;
}

const enums = {
  ArdDirection: ["down", "up", "left", "right"],
};

const specialIcons = [
  {
    name: "arrow",
    type: "outlined",
    enum: "ArdDirection",
    input: "direction",
    default: "Down",
    basedOn: "arrow-down",
  },
  {
    name: "chevron",
    type: "outlined",
    enum: "ArdDirection",
    input: "direction",
    default: "Down",
    basedOn: "chevron-down",
  },
  {
    name: "chevron-double",
    type: "outlined",
    enum: "ArdDirection",
    input: "direction",
    default: "Down",
    basedOn: "chevron-double-down",
  },
  {
    name: "chevron-2",
    type: "outlined",
    enum: "ArdDirection",
    input: "direction",
    default: "Down",
    basedOn: "chevron-down-2",
  },
];

(async () => {
  const changeCase = await import("change-case");

  const fileNames = require("./file-getter.js")();

  const isOk = require("./cleanup.js").cleanupWithConsole(fileNames);
  if (!isOk) {
    process.exit(1);
  }

  fsExtra.ensureDirSync(outPath);
  fsExtra.removeSync(publicApiPath);

  fsExtra.ensureDirSync(outPath + "outlined/");
  fsExtra.ensureDirSync(outPath + "filled/");
  
  console.log(`- Converting icon files...`);

  const exportLines = [];
  for (const { path, fileName } of fileNames) {
    const exportLine = createComponent(path, fileName, changeCase);
    exportLines.push(exportLine);
  }

  console.log(`${OK_STR} Finished converting ${fileNames.length} files`);
  
  console.log(`- Generating special icon files...`);

  for (const componentData of specialIcons) {
    const exportLine = createSpecialIconComponent(componentData, changeCase);
    exportLines.push(exportLine);
  }

  console.log(`${OK_STR} Finished generating ${specialIcons.length} files`);

  fs.writeFileSync(outPath + "../public-api.ts", exportLines.join("\n"), {
    encoding: "utf-8",
  });
  
  console.log(`${OK_STR} All done!`);

  process.exit(0);
})();

function createSpecialIconComponent(componentData, changeCase) {
  const {
    name,
    type,
    enum: enumName,
    input,
    basedOn,
    default: defaultValue,
  } = componentData;

  const implicitTypeString = type === "outlined" ? "" : type;
  const selector =
    "ard-icon-" + changeCase.kebabCase(`${name} ${implicitTypeString}`);
  const componentName =
    "ArdIcon" + changeCase.pascalCase(`${name} ${implicitTypeString}`);
  const enumValues = enums[enumName];

  const basedOnComponentName =
    "ArdIcon" + changeCase.pascalCase(`${basedOn} ${implicitTypeString}`);

  const hostClasses = enumValues
    .map(
      (value) =>
        `'[class.${value}]': '${input}() === ${enumName}.${changeCase.pascalCase(value)}'`,
    )
    .flat()
    .join(",\n    ");

  const componentSrc = `import { Component, input } from '@angular/core';
import { ${enumName} } from './enums';
import { ${basedOnComponentName} } from './${basedOn}.icon';

@Component({
  selector: '${selector}',
  standalone: true,
  template: '<ard-icon-${basedOn} />',
  host: {
    class: 'ard-icon-${type} ard-icon-input-${input}',
    ${hostClasses}
  },
  imports: [${basedOnComponentName}]
})
export class ${componentName} {
  readonly ${enumName} = ${enumName};
  readonly ${input} = input<${enumName}>(${enumName}.${defaultValue});
}`;

  fs.writeFileSync(outPath + type + "/" + `${name}.icon.ts`, componentSrc, {
    encoding: "utf-8",
  });

  return `export * from './lib/${type}/${name}.icon';`;
}
