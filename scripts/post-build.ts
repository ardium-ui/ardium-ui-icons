import fs from 'fs';
import path from 'path';
import { Timer } from './common/timer';
import { displayError, displaySuccess } from './common/utils';

const BASE_HREF_TAG = '<base href="/">';

const timer = new Timer();

const dirname = import.meta.dirname ?? __dirname;

const outputDir = path.join(dirname, '../dist/homepage/browser/');
console.log(`Output directory: ${outputDir}`);
const indexHtmlPath = path.join(outputDir, 'index.html');

(() => {
  if (!fs.existsSync(indexHtmlPath)) {
    displayError(`Cannot find index.html file. (${timer.toString()})`);
    return;
  }
  displaySuccess(`Found the index.html file. (${timer.toString()})`);
  timer.reset();

  let content = fs.readFileSync(indexHtmlPath, { encoding: 'utf-8' });

  if (!content.match(BASE_HREF_TAG)) {
    displayError(
      `The index.html file doesn't contain matching <base> tag. (${timer.toString()})`,
    );
    return;
  }
  content = content.replace(BASE_HREF_TAG, '<base href="/ardium-ui-icons/"/>');

  fs.writeFileSync(indexHtmlPath, content);

  displaySuccess(`Updated base href in index.html file. (${timer.toString()})`);
  timer.reset();

  fs.writeFileSync(path.join(outputDir, '404.html'), content);

  displaySuccess(
    `Copied index.html file to 404.html file. (${timer.toString()})`,
  );
  timer.reset();

  const files = fs.readdirSync(outputDir);

  let fileCounter = 0;
  let replacedCounter = 0;
  for (const fileName of files) {
    if (fileName.endsWith('.js') || fileName.endsWith('.html')) {
      fileCounter++;
      const fileWithDir = path.join(outputDir, fileName);
      let content = fs.readFileSync(fileWithDir, 'utf-8');

      let regex: RegExp;
      let replace: string;
      if (fileName.endsWith('.js')) {
        regex = new RegExp(',"/assets/', 'g');
        replace = ',"/ardium-ui-icons/assets/';
      } else {
        regex = new RegExp('href="(/?)assets/', 'g');
        replace = 'href="$1ardium-ui-icons/assets/';
      }

      const groups = content.match(regex);
      replacedCounter += groups?.length ?? 0;

      content = content.replaceAll(regex, replace);

      fs.writeFileSync(fileWithDir, content);
    }
  }
  displaySuccess(
    `Found ${fileCounter} .js and .html files and replaced ${replacedCounter} assets links in them. (${timer.toString()})`,
  );
})();
