const { getWords, translateWords, saveWords } = require("./helpers");
const { WORDS } = require("./constants/words");

const main = async () => {
  const startTime = performance.now();

  const words = await getWords();
  const translatedWords = await translateWords(words.slice(1, 2));

  await saveWords(WORDS.OUTDIR, translatedWords);

  const endTime = performance.now();
  console.log(
    `\n Done in ${
      Math.floor(((endTime - startTime) / 1000) * 1000) / 1000
    } seconds`
  );
};

main();
