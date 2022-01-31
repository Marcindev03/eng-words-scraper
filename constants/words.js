const path = require("path");

const WORDS = Object.freeze({
  OUTDIR: path.resolve(__dirname, "..", "db", "words.json"),
  EXCEL_OUT_DIR: path.resolve(__dirname, "..", "db", "decks"),
});

module.exports = { WORDS };
