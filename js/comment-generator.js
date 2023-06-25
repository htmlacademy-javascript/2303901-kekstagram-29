import {getRandomInteger} from './util.js';

const PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];

const NAMES = [
  'Ваня',
  'Настя',
  'Коля',
  'Серега',
  'Маша',
  'Вероника',
];

// создаю комменты
let commentIdCounter = 1;
const addComment = () => ({
  id: commentIdCounter++,
  avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
  message:PHOTO_COMMENTS[getRandomInteger(0, PHOTO_COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, 5)]
});

// создаю массив комментов
const addComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(addComment());
  }
  return comments;
};

export {addComments};
