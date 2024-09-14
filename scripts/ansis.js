const ansis = require("ansis");

const OK_STR = ansis.bold.greenBright("✓");
const ERR_STR = ansis.bold.redBright("✕");

module.exports = { OK_STR, ERR_STR };
