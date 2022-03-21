const fs = require("fs");
const fsPromises = require("fs/promises");
const cheerio = require("cheerio");
const { createSpinner } = require("nanospinner");
const { get3000WordsHtml, get1000WordsHtml } = require("../api/apiClient");
const { translate } = require("./translate");
const { sleep } = require("./sleep");
const { WORDS } = require("../constants/words");
const { TRANSLATION } = require("../constants/translate");

const getWords = async (number) => {
  const fetchLoading = createSpinner("Fetching Data").start();
  const wordsHtml =
    number === 1000 ? await get1000WordsHtml() : await get3000WordsHtml();

  fetchLoading.success();

  const scrapintLoading = createSpinner("Scraping Data").start();

  const $ = cheerio.load(wordsHtml);
  const htmlWords = $("p ~ p").html();
  const words = htmlWords.split("<br>").map((word) => word.replace(`\n\t`, ""));

  scrapintLoading.success();

  return words;
};

const translateWords = async (words) => {
  const translateLoading = createSpinner("Translating Data").start();

  let translated = [];

  const length = process.env.NODE_ENV === "development" ? 50 : words.length;

  for (let i = 0; i < length; i++) {
    const item = await translate(words[i]);
    translated.push(item);
    sleep(TRANSLATION.REQUEST_SPACING);
  }

  translated = translated
    .map(({ word, translations }) =>
      translations.slice(0, 1).map(({ translation, definition, examples }) => {
        const question = translation;
        const answer = ` ${word}
      
 ${definition}
          ${examples.map((example) => `\n "${example}"`)}
          `;

        return [question, answer];
      })
    )
    .flat();

  translateLoading.success();

  return translated;
};

const saveWords = async (words) => {
  const savingLoading = createSpinner("Saving JSON").start();
  const outDirWithoutFilename = WORDS.JSON_OUTDIR.substring(
    0,
    WORDS.JSON_OUTDIR.lastIndexOf("/")
  );

  if (!fs.existsSync(outDirWithoutFilename)) {
    fs.mkdirSync(outDirWithoutFilename);
  }

  await fsPromises.writeFile(WORDS.JSON_OUTDIR, JSON.stringify(words));

  savingLoading.success();
};

module.exports = { getWords, translateWords, saveWords };
