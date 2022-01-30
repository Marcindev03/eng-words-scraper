const { getWords, translateWords, saveWords, isDev } = require("./helpers");
const { WORDS } = require("./constants/words");

const main = async () => {
  const startTime = performance.now();

  const words = await getWords();
  const translatedWords = await translateWords(
    process.env.NODE_ENV === "development" ? words.slice(0, 20) : words
  );

  await saveWords(WORDS.OUTDIR, translatedWords);

  const endTime = performance.now();
  console.log(
    `\n Done in ${
      Math.floor(((endTime - startTime) / 1000) * 1000) / 1000
    } seconds`
  );
};

main();
