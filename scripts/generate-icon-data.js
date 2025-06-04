const fs = require('fs');
const fsExtra = require('fs-extra');
const { OK_STR, ERR_STR } = require('./ansis.js');

const HOMEPAGE_DATA_PATH = '../projects/homepage/src/app/services/icon-storage/icon-data.ts';

module.exports = function () {
  const existingData = fs.readFileSync(HOMEPAGE_DATA_PATH, 'utf-8').match(/export const ICON_DATA = \[((?:.|\n)*?)\];/)?.[1];

  if (!existingData) {
    console.error(ERR_STR, 'No existing icon data found in output file ' + HOMEPAGE_DATA_PATH);
    return false;
  }
  const iconDataArray = existingData.split(/\n*\s*,\s*\n/)
  console.log(iconDataArray);
}