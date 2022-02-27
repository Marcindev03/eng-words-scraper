const fetch = require("node-fetch");
const { URLS } = require("../constants/api");

const get1000WordsHtml = async () => await getHtml(URLS.WORDS_1000);
const get3000WordsHtml = async () => await getHtml(URLS.WORDS_3000);
const getTranslationHtml = async (word) => await getHtml(URLS.TRANSLATE + word);

const getHtml = async (url) => {
  const res = await fetch(url);
  const html = await res.text();

  return html;
};

module.exports = { get1000WordsHtml, get3000WordsHtml, getTranslationHtml };
