const isDev = () => (process.env.NODE_ENV === "development" ? true : false);

module.exports = { isDev };
