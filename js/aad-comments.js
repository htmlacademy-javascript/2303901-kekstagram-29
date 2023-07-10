
import {getcopyArrayPhoto} from './thumbnail-rendering.js';




//адресса картинок
const BIG_PICTURE = document.querySelector('.big-picture');

const START_INDEX_COMMENTS = 0;
const BUTTON_ADD_COMMENTS = document.querySelector('.comments-loader');
const copyArrayPhoto = getcopyArrayPhoto();

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
const getAllComments = (comments) => {

  const commentsToPhoto = document.querySelector('.social__comments');
  const fragmentComments = document.createDocumentFragment();

  //массив комментов
  comments.forEach((comment) => {

    fragmentComments.append(createBlockComment(comment));

  });

  commentsToPhoto.append(fragmentComments);
};

//функция отрисовки коментарие порционно
let countShowComments = 5;

//сброс счетчика и обработчика событий для комментариев
const closeCountComments = (resetCountComment) => {
  //BUTTON_ADD_COMMENTS.removeEventListener('click', onClickAddComments);
  countShowComments = resetCountComment;
};



const getIterationForArrayComments = (iteratioArrayComments) => {

  const targetIdComments = +iteratioArrayComments.id - 1;

  const allComment = document.querySelector('.social__comments');
  const comments = copyArrayPhoto[targetIdComments].comments;
  allComment.innerHTML = '';


  const listenerButtonComments = (evt) => {
    evt.preventDefault();
    countShowComments += 5;
    allComment.innerHTML = '';

    getAllComments(comments.slice(START_INDEX_COMMENTS, countShowComments));
  };

  getAllComments(comments.slice(START_INDEX_COMMENTS, countShowComments));
  BUTTON_ADD_COMMENTS.addEventListener('click', listenerButtonComments);

};


//функция получения коменнариев картинки
const getInfoComment = (iterationPhoto) => {

  const allComment = document.querySelector('.social__comments');
  const comments = copyArrayPhoto[iterationPhoto].comments;
  allComment.innerHTML = '';
  getAllComments(comments.slice(START_INDEX_COMMENTS, countShowComments));

};

export {BIG_PICTURE, createContentBigPhoto, getInfoComment, closeCountComments, getIterationForArrayComments,countShowComments};
