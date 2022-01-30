const fs = require("fs");
const fsPromises = require("fs/promises");
const cheerio = require("cheerio");
const { createSpinner } = require("nanospinner");
const { getWordsHtml } = require("../api/apiClient");
const { translate } = require("./translate");

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

const translateWords = async (words) =>
  new Promise((r) => {
    const translateLoading = createSpinner("Translating Data").start();

    const translated = [];

    const promises = words.map(async (word) =>
      translated.push(await translate(word))
    );

    Promise.all(promises).then(() => {
      translateLoading.success();
      r(translated);
    });
  });

const saveWords = async (outDir, words) => {
  const savingLoading = createSpinner("Saving Data").start();
  const outDirWithoutFilename = outDir.substring(0, outDir.lastIndexOf("/"));

  if (!fs.existsSync(outDirWithoutFilename)) {
    fs.mkdirSync(outDirWithoutFilename);
  }

  await fsPromises.writeFile(outDir, JSON.stringify(words));

  savingLoading.success();
};

module.exports = { getWords, translateWords, saveWords };
