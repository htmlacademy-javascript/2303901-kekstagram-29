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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createPhotoDiscription = () => ({
  id: '',
  url: '',
  discription: PHOTO_DISCRIPTION[getRandomInteger(0, PHOTO_DISCRIPTION.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: {
    id: '',
    avatar: `img/avatar-${getRandomInteger(0, 6)}.svg`,
    message:PHOTO_COMMENTS[getRandomInteger(0, PHOTO_COMMENTS.length - 1)],
    name: NAMES[getRandomInteger(0, 5)],
  },
});

const createArrays = Array.from({length: 25}, createPhotoDiscription);

for (let i = 0;i <= createArrays.length - 1;i++){
  createArrays[i].id = i + 1;
  createArrays[i].url = `photos/${i + 1}.jpg`;
  createArrays[i].comments.id = i + 1;
}

