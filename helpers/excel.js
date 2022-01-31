const fs = require("fs");
const ExcelJS = require("exceljs");
const { createSpinner } = require("nanospinner");
const { WORDS } = require("../constants/words");

const saveAsExcel = async (words = []) =>
  new Promise((r) => {
    const excelLoading = createSpinner("Saving Excel").start();

    const perChunk =
      process.env.NODE_ENV === "development"
        ? words.length / 10
        : WORDS.CHUNK_LENGTH;
    const shuffledWordsArray = words.sort(() => Math.random() - 0.5);
    const wordsChunks = shuffledWordsArray.reduce((result, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(item);

      return result;
    }, []);

    const promises = wordsChunks.map(createDeck);

    Promise.all(promises).then(() => {
      excelLoading.success();
      r();
    });
  });

const createDeck = async (chunk, id) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sheet 1");

  chunk.map(({ word, translations }) => {
    translations.map(({ translation, definition, examples }) => {
      const question = translation;
      const answer = ` ${word}
      
 ${definition}
          ${examples.map((example) => `\n "${example}"`)}
          `;

      sheet.addRow([question, answer]);
    });
  });

  if (!fs.existsSync(WORDS.EXCEL_OUTDIR)) {
    fs.mkdirSync(WORDS.EXCEL_OUTDIR);
  }

  await workbook.csv.writeFile(`${WORDS.EXCEL_OUTDIR}/deck_${id}.csv`);
};

module.exports = { saveAsExcel };
