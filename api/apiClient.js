const fetch = require("node-fetch");
const { URLS } = require("../constants/api");

const getWordsHtml = async () => await getHtml(URLS.WORDS);
const getTranslationHtml = async (word) => await getHtml(URLS.TRANSLATE + word);

const getHtml = async (url) => {
  const res = await fetch(url);
  const html = await res.text();

  return html;
};

module.exports = { getWordsHtml, getTranslationHtml };
