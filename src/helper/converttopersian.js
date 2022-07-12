const persian = {
  0: '۰',
  1: '۱',
  2: '۲',
  3: '۳',
  4: '۴',
  5: '۵',
  6: '۶',
  7: '۷',
  8: '۸',
  9: '۹'
};
export default function convertToPersian(str) {
  str = str.toString();
  for (let i = 0; i < str.length; i++) {
    if (persian[str[i]]) str = str.replace(str[i], persian[str[i]]);
    else str = str.replace(str[i], str[i]);
  }
  return str;
}
