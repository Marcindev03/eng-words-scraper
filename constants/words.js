const path = require("path");

const WORDS = Object.freeze({
  OUTDIR: path.resolve(__dirname, "..", "db", "words.json"),
});

module.exports = { WORDS };
