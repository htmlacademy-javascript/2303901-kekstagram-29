
import {getRandomInteger, debounce} from './util.js';
import {paintAllPictures} from './thumbnail-rendering.js';

const TIME_OUT_DELAY = 500;
const VALUE_RANDOM_PHOTO = 10;
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');


const filterDefault = (photos) => {
  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });
  paintAllPictures(photos);
};


const onAddFilterDefault = (photos) => {
  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });
  filterDefault(photos);
};


const onButtonActiveDefault = () => {
  buttonFilterDefault.classList.add('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
};


const filterRandom = (array, count) => {
  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });

  const selectedElements = new Set();
  count = Math.min(count, array.length);

  while (selectedElements.size < count) {
    const randomIndex = getRandomInteger(0, array.length - 1);
    selectedElements.add(array[randomIndex]);
  }

  return Array.from(selectedElements);
};


const onAddFilterRandom = (photos) => {
  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });

  const selectedPhotos = filterRandom(photos,VALUE_RANDOM_PHOTO);
  paintAllPictures(selectedPhotos);
};


const onButtonActiveRandom = () => {
  buttonFilterRandom.classList.add('img-filters__button--active');
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterDiscussed.classList.remove('img-filters__button--active');
};


const filterDiscussed = (photos) => {
  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });

  const sortedPictures = [...photos].slice().sort((a, b) => b.comments.length - a.comments.length);
  paintAllPictures(sortedPictures);
};


const onAddFilterDiscussed = (photos) => {
  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });

  filterDiscussed(photos);
};

const onButtonActiveDiscussed = () => {
  buttonFilterDiscussed.classList.add('img-filters__button--active');
  buttonFilterDefault.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
};

const addSortToPhotos = (photos) => {
  buttonFilterDefault.addEventListener('click', debounce(() => onAddFilterDefault(photos), TIME_OUT_DELAY));
  buttonFilterRandom.addEventListener('click', debounce(() => onAddFilterRandom(photos), TIME_OUT_DELAY));
  buttonFilterDiscussed.addEventListener('click', debounce(() => onAddFilterDiscussed(photos), TIME_OUT_DELAY));
};

buttonFilterDefault.addEventListener('click', onButtonActiveDefault);
buttonFilterRandom.addEventListener('click', onButtonActiveRandom);
buttonFilterDiscussed.addEventListener('click', onButtonActiveDiscussed);

export {addSortToPhotos};
