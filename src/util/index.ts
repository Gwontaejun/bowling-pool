const calcDate = (text: string) => {
  const notNumberRegex = /[^0-9]/g;
  const result = text.replace(notNumberRegex, '');
  const number = Number(result);

  if (/분|시간|:/.test(text)) {
    return new Date().valueOf();
  }
  if (/일/.test(text)) {
    return new Date().setDate(-number);
  }
  if (/주/.test(text)) {
    return new Date().setDate(-(number * 7));
  }
  if (/달/.test(text)) {
    return new Date().setMonth(-number);
  }
  if (/년/.test(text)) {
    return new Date().setFullYear(new Date().getFullYear() - number);
  }
  return new Date(text).valueOf();
};

const utils = {
  calcDate,
};

export default utils;
