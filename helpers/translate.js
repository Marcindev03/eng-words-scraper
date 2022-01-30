const cheerio = require("cheerio");
const { getTranslationHtml } = require("../api/apiClient");

const translate = async (word) => {
  const translationHtml = await getTranslationHtml(word);
  const translations = [];

  const $ = cheerio.load(translationHtml);
  const blocks = $(".pr.dsense");

  blocks.each((i, elem) => {
    const block = $(elem);

    const translation = block.find(".trans.dtrans.dtrans-se").text();
    const definition = block.find(".def.ddef_d.db").text();

    const examples = [];
    block.find(".eg.deg").each((i, elem) => examples.push($(elem).text()));

    translations.push({
      translation,
      definition,
      examples,
    });
  });

  return {
    word,
    translations,
  };
};

module.exports = { translate };
