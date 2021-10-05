module.exports = (content, separator = ',') => {
  let quoteFlag = false;

  const matrix = [];
  let currentWord = '';
  let i = 0;
  let j = 0;

  content.split('').forEach((char, index) => {
    if (!matrix[i]) matrix[i] = [];

    if (char === '"') {
      quoteFlag = !quoteFlag;
      return;
    }

    if (char === separator && quoteFlag === false) {
      matrix[i][j] = currentWord;
      currentWord = '';
      j++;
      return;
    }

    if (char === '\r' && quoteFlag === false) {
      matrix[i][j] = currentWord;
      i++;
      if (!matrix[i]) matrix[i] = [];
      currentWord = '';
      j = 0;
      return;
    }

    if (char === '\n' && quoteFlag === false) {
      return;
    }

    currentWord += char;

    if (index === content.length - 1) {
      matrix[i][j] = currentWord;
    }
  });

  return matrix;
}