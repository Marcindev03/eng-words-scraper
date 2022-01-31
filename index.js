const {
  getWords,
  translateWords,
  saveWords,
  saveAsExcel,
} = require("./helpers");
const { WORDS } = require("./constants/words");

const main = async () => {
  console.log(process.env.NODE_ENV);

  const startTime = performance.now();

  const words = await getWords();
  const translatedWords = await translateWords(words);

  await saveWords(WORDS.OUTDIR, translatedWords);

  await saveAsExcel(WORDS.EXCEL_OUT_DIR, translatedWords);

  const endTime = performance.now();
  console.log(
    `\n Done in ${
      Math.floor(((endTime - startTime) / 1000) * 1000) / 1000
    } seconds`
  );
};

main();
