const { createSpinner } = require("nanospinner");

const saveAsExcel = async () => {
  return new Promise((r) => {
    const excelLoading = createSpinner("Saving Excel");
    setTimeout(() => {
      excelLoading.success();
      r();
    }, 2000);
  });
};

module.exports = { saveAsExcel };
