const cheerio = require("cheerio");
const { getTranslationHtml } = require("../api/apiClient");

const translate = async (word) => {
  const translationHtml = await getTranslationHtml(word);

  const $ = cheerio.load(translationHtml);
  const translationsHtml = $(".pr.dsense .trans.dtrans.dtrans-se");
  const translations = [];

  translationsHtml.each((i, elem) => {
    const item = $(elem).text();
    translations.push(item);
  });

  const examples = [];
  const examplesHtml = $(".pr.dsense .eg.deg");

  examplesHtml.each((i, elem) => {
    const item = $(elem).text();
    examples.push(item);
  });

  return {
    word,
    translations,
    examples,
  };

  // return {
  //   word: word,
  //   translations: [
  //     {
  //       translation: `${word} / translation`,
  //       examples: [
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //       ],
  //     },
  //     {
  //       translation: `${word} / translation`,
  //       examples: [
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //       ],
  //     },
  //     {
  //       translation: `${word} / translation`,
  //       examples: [
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //         {
  //           sentence: `${word} ${word} ${word} ${word} / sentence`,
  //         },
  //       ],
  //     },
  //   ],
  // };
};

module.exports = { translate };
