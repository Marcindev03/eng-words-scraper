const { getWords, translateWords, saveWords } = require("./words");
const { sleep } = require("./sleep");
const { saveAsExcel } = require("./excel");

module.exports = { getWords, translateWords, saveWords, sleep, saveAsExcel };
