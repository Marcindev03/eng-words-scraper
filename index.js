const {
  getWords,
  translateWords,
  saveWords,
  saveAsExcel,
} = require("./helpers");

const SHUFFLE = process.argv.includes("shuffle");
const WORDS = process.argv[2];

const main = async () => {
  const startTime = performance.now();

  const words = await getWords(WORDS);
  const translatedWords = SHUFFLE
    ? (await translateWords(words)).sort(() => Math.random() - 0.5)
    : await translateWords(words);

  await saveWords(translatedWords);

  await saveAsExcel(translatedWords);

  const endTime = performance.now();
  console.log(
    `\n Done in ${
      Math.floor(((endTime - startTime) / 1000) * 1000) / 1000
    } seconds`
  );
};

main();
