
import {arrayPhotos} from './thumbnail-rendering.js';


//адресса картинок
const BIG_PICTURE = document.querySelector('.big-picture');
const SMALL_PICTURES = document.querySelectorAll('.picture');

// функция заполняющая большую картинку описаниями из маленькой картинки
const createContentBigPhoto = (clickPicture) => {

  const datasSmallPictures = clickPicture.querySelector('.picture__img');
  const datasBigPictures = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');
  const likesBigPicture = BIG_PICTURE.querySelector('.likes-count');
  const likesSmallPicture = clickPicture.querySelector('.picture__likes');
  const commentsBigPicture = BIG_PICTURE.querySelector('.comments-count');
  const commentsSmallPicture = clickPicture.querySelector('.picture__comments');
  const discriptionBigPhoto = BIG_PICTURE.querySelector('.social__caption');
  const modalOpen = document.querySelector('body');

  modalOpen.classList.add('modal-open');
  BIG_PICTURE.classList.remove('hidden');
  datasBigPictures.src = datasSmallPictures.src;
  discriptionBigPhoto.textContent = datasSmallPictures.alt;
  likesBigPicture.textContent = likesSmallPicture.textContent;
  commentsBigPicture.textContent = commentsSmallPicture.textContent;

};

//функция создающая клон коментатора

//функция по созданию коментариев пользователей
const createBlockComment = ({avatar, message, name }) => {

  const avatarPhotograph = BIG_PICTURE.querySelector('.social__picture');
  avatarPhotograph.src = avatar;

  const oneComment = document.createElement('li');
  oneComment.classList.add('social__comment');

  const photoAvatar = document.createElement('img');
  photoAvatar.classList.add('social__picture');
  photoAvatar.alt = name;
  photoAvatar.src = avatar;

  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = message;

  oneComment.append(photoAvatar);
  oneComment.append(textComment);

  return oneComment;
};

// функция coбирающая коментарии
const getAllComments = (coments) => {

  const commentsToPhoto = document.querySelector('.social__comments');
  const fragmentComments = document.createDocumentFragment();

  //массив комментов
  coments.forEach((comment) => {

    fragmentComments.append(createBlockComment(comment));

  });
  commentsToPhoto.append(fragmentComments);
};

// функция получения коменнариев картинки
const getInfoComment = (iterationPhoto) => {

  const comments = arrayPhotos[iterationPhoto].comments;
  const allComment = document.querySelector('.social__comments');
  allComment.innerHTML = '';

  getAllComments(comments);
};

export {BIG_PICTURE,SMALL_PICTURES, createContentBigPhoto, getInfoComment};
