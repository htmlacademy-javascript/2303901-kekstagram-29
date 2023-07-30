const getRandomInteger = (upper, lower) => {
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, debounce};
