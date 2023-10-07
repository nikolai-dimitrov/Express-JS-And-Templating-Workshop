exports.validateUrl = (url) => {
  let valueStr = url.toString();
  if (!valueStr.startsWith("http://") && !valueStr.startsWith("https://")) {
    // If return false throw error message in Cube.js (Model file)
    return false;

    // If throw new error throw error in this file.
    // throw new Error("Error Message");
  }
  return true;
};
// exports.validateIsDigitAndLettersOnly = (value) => {
//   return /^[A-Za-z0-9]+$/.test(value);
// };
