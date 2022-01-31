const path = require("path");

const WORDS = Object.freeze({
  JSON_OUTDIR: path.resolve(__dirname, "..", "db", "words.json"),
  EXCEL_OUTDIR: path.resolve(__dirname, "..", "db", "decks"),
  CHUNK_LENGTH: 100,
});

module.exports = { WORDS };
