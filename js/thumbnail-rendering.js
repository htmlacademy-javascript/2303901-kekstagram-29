import {showBigPicture} from './open-close-picture.js';

//поиск клона шаблона
const THEMPLATE_PICTURE = document.querySelector('#picture').content;
const THEMPLATE_PICTURE_TEG = THEMPLATE_PICTURE.querySelector('.picture');

//функция создания элемента разметки
const createBlockPhoto = ({url, discription, likes, comments, id}) => {

  const copyTemplateTeg = THEMPLATE_PICTURE_TEG.cloneNode(true);
  const pictureImg = copyTemplateTeg.querySelector('.picture__img');
  const pictureComments = copyTemplateTeg.querySelector('.picture__comments');
  const pictureLikes = copyTemplateTeg.querySelector('.picture__likes');

  pictureImg.id = id;
  pictureImg.src = url;
  pictureImg.alt = discription;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return copyTemplateTeg;
};

//функция отрисовки которая собирает коллекцию фото с описаниями
const paintAllPictures = (valuePhoto) => {
  //места вставки клона на страницу
  const addToHtml = document.querySelector('.pictures');
  //создание фрагмента
  const fragmentPhoto = document.createDocumentFragment();

  valuePhoto.forEach((elementPhoto) => {

    fragmentPhoto.append(createBlockPhoto(elementPhoto));
  });

  addToHtml.appendChild(fragmentPhoto);

  showBigPicture(valuePhoto);
};

export{paintAllPictures};
