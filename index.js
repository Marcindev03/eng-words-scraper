const {
  getWords,
  translateWords,
  saveWords,
  saveAsExcel,
} = require("./helpers");

const main = async () => {
  const startTime = performance.now();

  const words = await getWords();
  const translatedWords = await translateWords(words);

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
