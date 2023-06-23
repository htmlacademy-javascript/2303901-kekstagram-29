import {getRandomInteger} from './util.js';
import {addComments} from './comment-generator.js';

const PHOTO_DISCRIPTION = [
  'Ёлки в лесу',
  'Вид на горы',
  'Самолет в облаках',
  'Котик', 'Мои друганы',
  'Милые собычки',
  'Красивый домик',
  'Море'];

const PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
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
  const photosAll = [];
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photosAll.push(addPhoto(i));
  }
  return photosAll;
};

addPhotos();
console.log(addPhotos())
