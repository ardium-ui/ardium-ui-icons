import fs from 'fs';
import path from 'path';
import { Timer } from './common/timer';
import { displaySuccess } from './common/utils';

const dirname = import.meta.dirname ?? __dirname;

function countSvgFiles(dirPath: string): number {
  return fs.readdirSync(dirPath, { withFileTypes: true }).reduce((total, entry) => {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      return total + countSvgFiles(entryPath);
    }

    return total + Number(path.extname(entry.name).toLowerCase() === '.svg');
  }, 0);
}

export function copyIconsToHomepage() {
  const timer = new Timer();

  const sourcePath = path.join(dirname, '../raw');
  const destPath = path.join(dirname, '../projects/homepage/src/assets/icons');

  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true });
    displaySuccess(`Cleared existing icons folder (${timer.toString()})`);
  }

  fs.mkdirSync(destPath, { recursive: true });

  fs.cpSync(sourcePath, destPath, {
    recursive: true,
    filter: (src) => {
      return fs.statSync(src).isDirectory() || path.extname(src).toLowerCase() === '.svg';
    },
  });

  const copiedIconCount = countSvgFiles(destPath);
  displaySuccess(`Copied ${copiedIconCount} icons! (${timer.toString()})`);
}
