const PHOTO_DISCRIPTION = [
  'Ёлки в лесу',
  'Вид на горы',
  'Самолет в облаках',
  'Котик', 'Мои друганы',
  'Милые собычки',
  'Красивый домик',
  'Море'];

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

const PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const PhotosAll = [];


//рандомный номер
const getRandomInteger = (upper, lower) => {
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//создаю фото
const addPhoto = (id) => ({
  id: id,
  url:`photos/${id}.jpg`,
  discription:PHOTO_DISCRIPTION[getRandomInteger(0, PHOTO_DISCRIPTION.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: addComments(getRandomInteger(0, 30)),
});

//создаю массив фото
const addPhotos = () => {
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    PhotosAll.push(addPhoto(i));
  }
};

// создаю комменты
let commentIdCounter = 1;
const addComment = () => ({
  id: commentIdCounter++,
  avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
  message:PHOTO_COMMENTS[getRandomInteger(0, PHOTO_COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, 5)],

});

// создаю массив комментов
const addComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(addComment());
  }
  return comments;
};

addPhotos();
