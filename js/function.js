// Первая функция
const getLength1 = (line, quantity) => {
  return (line.length <= quantity) ? true : false;
}
getLength1('проверяемая строка', 20);


// Вторая функция
function getLength2 (line, quantity) {
  if(line.length >= quantity){
    return true;
  }
  return false;
}
getLength2('проверяемая строка', 18);


// Третья функция
function getLength3 (line, quantity) {
  if(line.length <= quantity){
    return true;
  }
  return false;
}
getLength3('проверяемая строка', 10);


// Четвертая функция проверка на палиндром
const getExamination = (palindrome) => {
  const removeCorklets = palindrome.replaceAll(' ', '');
  const capitalLetters = removeCorklets.toUpperCase();
  let line = '';

  for(let i = capitalLetters.length - 1;i >= 0;i--){
    line += capitalLetters[i];
  }
  return (capitalLetters === line) ? true : false;
};
getExamination('Лёша на полке клопа нашёл ');


// Дополнительное задание
const getNumber = (string) => {
  let change = '';
  for(let i = 0;i <= string.length - 1;i++){
    if(!isNaN(string[i]) && string[i] !== ' '){
      change += parseInt(string[i]);
    }
  }
  return parseInt(change)
};
getNumber('ECMAScript 2022');
