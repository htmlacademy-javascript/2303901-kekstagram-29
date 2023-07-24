
import {getRandomInteger} from './util.js';
import {paintAllPictures} from './thumbnail-rendering.js';


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


const addFilterDefault = (photos) => {
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


const addFilterRandom = (photos) => {

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

const addFilterGiscussed = (photos) => {

  const clear = document.querySelectorAll('.picture');

  clear.forEach((element) => {
    element.remove();
  });

  filterGiscussed(photos);
};

const addSortToPhotos = (photos) => {
  paintAllPictures(photos);
  buttonFilterDefauit.addEventListener('click', () => addFilterDefault(photos));
  buttonFilterRandom.addEventListener('click', () => addFilterRandom(photos));
  buttonFilterGiscussed.addEventListener('click', () => addFilterGiscussed(photos));
};


export {addSortToPhotos};
