const fs = require("fs");
const fsPromises = require("fs/promises");
const cheerio = require("cheerio");
const { createSpinner } = require("nanospinner");
const { getWordsHtml } = require("../api/apiClient");
const { translate } = require("./translate");
const { sleep } = require("./sleep");

const getWords = async () => {
  const fetchLoading = createSpinner("Fetching Data").start();

  const wordsHtml = await getWordsHtml();

  fetchLoading.success();

  const scrapintLoading = createSpinner("Scraping Data").start();

  const $ = cheerio.load(wordsHtml);
  const htmlWords = $("p ~ p").html();
  const words = htmlWords.split("<br>");

  scrapintLoading.success();

  return words;
};

const translateWords = async (words) => {
  const translateLoading = createSpinner("Translating Data").start();

  const translated = [];

  const length = process.env.NODE_ENV === "development" ? 50 : words.length;

  for (let i = 0; i < length; i++) {
    const item = await translate(words[i]);
    translated.push(item);
    sleep(50);
  }

  translateLoading.success();
  return translated;
};

const saveWords = async (outDir, words) => {
  const savingLoading = createSpinner("Saving JSON").start();
  const outDirWithoutFilename = outDir.substring(0, outDir.lastIndexOf("/"));

  if (!fs.existsSync(outDirWithoutFilename)) {
    fs.mkdirSync(outDirWithoutFilename);
  }

  await fsPromises.writeFile(outDir, JSON.stringify(words));

  savingLoading.success();
};

module.exports = { getWords, translateWords, saveWords };
