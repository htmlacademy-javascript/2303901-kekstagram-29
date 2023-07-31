import {handleClickSmallMiniature} from './open-close-picture.js';

const templatePicture = document.querySelector('#picture').content;
const templatePictureTeg = templatePicture.querySelector('.picture');

const createBlockPhoto = ({url, description, likes, comments, id}) => {
  const copyTemplateTeg = templatePictureTeg.cloneNode(true);
  const pictureImg = copyTemplateTeg.querySelector('.picture__img');
  const pictureComments = copyTemplateTeg.querySelector('.picture__comments');
  const pictureLikes = copyTemplateTeg.querySelector('.picture__likes');

  pictureImg.id = id;
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return copyTemplateTeg;
};

const paintAllPictures = (valuePhoto) => {
  const addToHtml = document.querySelector('.pictures');
  const fragmentPhoto = document.createDocumentFragment();

  valuePhoto.forEach((elementPhoto) => {
    fragmentPhoto.append(createBlockPhoto(elementPhoto));
  });

  addToHtml.appendChild(fragmentPhoto);
  handleClickSmallMiniature(valuePhoto);
};

export{paintAllPictures};
