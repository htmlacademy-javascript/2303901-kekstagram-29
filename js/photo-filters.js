
import {getRandomInteger, debounce} from './util.js';
import {paintAllPictures} from './thumbnail-rendering.js';

const TIME_OUT_DELAY = 500;
const buttonFilterDefauit = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterGiscussed = document.querySelector('#filter-discussed');


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
  buttonFilterDefauit.classList.add('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterGiscussed.classList.remove('img-filters__button--active');
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

  const selectedPhotos = filterRandom(photos, 10);
  paintAllPictures(selectedPhotos);
  buttonFilterRandom.classList.add('img-filters__button--active');
  buttonFilterDefauit.classList.remove('img-filters__button--active');
  buttonFilterGiscussed.classList.remove('img-filters__button--active');
};

const filterGiscussed = (photos) => {

  const clear = document.querySelectorAll('.picture');
  clear.forEach((element) => {
    element.remove();
  });

  const sortedPictures = [...photos].slice().sort((a, b) => b.comments.length - a.comments.length);
  paintAllPictures(sortedPictures);
  buttonFilterDefauit.classList.remove('img-filters__button--active');
  buttonFilterRandom.classList.remove('img-filters__button--active');
  buttonFilterGiscussed.classList.add('img-filters__button--active');
};

const onAddFilterGiscussed = (photos) => {

  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });

  filterGiscussed(photos);
};

const addSortToPhotos = (photos) => {
  //paintAllPictures(photos);
  buttonFilterDefauit.addEventListener('click', debounce(() => onAddFilterDefault(photos), TIME_OUT_DELAY));
  buttonFilterRandom.addEventListener('click', debounce(() => onAddFilterRandom(photos), TIME_OUT_DELAY));
  buttonFilterGiscussed.addEventListener('click', debounce(() => onAddFilterGiscussed(photos), TIME_OUT_DELAY));
};


export {addSortToPhotos};
