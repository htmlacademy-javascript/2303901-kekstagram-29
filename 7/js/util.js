//функция создает рандомный номер
const getRandomInteger = (upper, lower) => {
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {getRandomInteger};
