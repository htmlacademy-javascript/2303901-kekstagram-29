
import {arrayPhotos} from './thumbnail-rendering.js';

//адресса картинок
const BIG_PICTURE = document.querySelector('.big-picture');
const SMALL_PICTURES = document.querySelectorAll('.picture');
const START_INDEX_COMMENTS = 0;
const BUTTON_ADD_COMMENTS = document.querySelector('.comments-loader');

// функция заполняющая большую картинку описаниями из маленькой картинки
const createContentBigPhoto = (clickPicture) => {
console.log(clickPicture)
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

/*
let count = 9;
//функция добовляющая 5 комментариев
const loadFiveComments = () => {
  const commentsWithHidden = document.querySelectorAll('.social__comment');

  for (let i = 0; i < commentsWithHidden.length ; i++){

    if(i <= count){
      commentsWithHidden[i].classList.remove('hidden');

    }if(commentsWithHidden.length === i){

      return;
    }
  }
  count += 5;

};
*/

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
let countShowComments = 0;
console.log(countShowComments)
const copyArrayComents = (comment, iterationPhoto) => {

  const allComment = document.querySelector('.social__comments');
  allComment.innerHTML = '';

  countShowComments += 5;
  console.log(countShowComments);

  const listenerButtonCOmments = (evt) => {
    evt.preventDefault();
    const comments = arrayPhotos[iterationPhoto].comments;
    copyArrayComents(comments, iterationPhoto);
    BUTTON_ADD_COMMENTS.removeEventListener('click', listenerButtonCOmments);

  };

  BUTTON_ADD_COMMENTS.addEventListener('click', listenerButtonCOmments);
  //if(comment.length - 1 <= countShowComments){
  // BUTTON_ADD_COMMENTS.removeEventListener('click', listenerButtonCOmments);
  //}


  getAllComments(comment.slice(START_INDEX_COMMENTS, countShowComments));
};

//сброс счетчика и обработчика событий для комментариев
const closeCountComments = (resetCountComment) => {

  //BUTTON_ADD_COMMENTS.removeEventListener('click', onClickAddComments);
  countShowComments = resetCountComment;
  console.log(countShowComments);
};

//функция получения коменнариев картинки
const getInfoComment = (iterationPhoto) => {
  const allComment = document.querySelector('.social__comments');
  allComment.innerHTML = '';

  const comments = arrayPhotos[iterationPhoto].comments;

  copyArrayComents(comments, iterationPhoto);






};


export {BIG_PICTURE,SMALL_PICTURES, createContentBigPhoto, getInfoComment, closeCountComments,};
