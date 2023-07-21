import {createCounter} from './aad-comments.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const BUTTON_ADD_COMMENTS = document.querySelector('.comments-loader');
const COMMENTS_COUNTER_VALUES = 0;
const addButtonShowComments = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');
const {closeCountComments, showFiveComments} = createCounter();

// функция заполняющая большую картинку описаниями из маленькой картинки
const fillBigPhotoDiscriptions = ({description, url, likes, comments,id}) => {

  const datasBigPictures = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');
  const likesBigPicture = BIG_PICTURE.querySelector('.likes-count');
  const commentsBigPicture = BIG_PICTURE.querySelector('.comments-count');
  const discriptionBigPhoto = document.querySelector('.social__header').querySelector('.social__caption');
  const modalOpen = document.querySelector('body');

  modalOpen.classList.add('modal-open');
  datasBigPictures.src = url;
  datasBigPictures.alt = description;
  discriptionBigPhoto.textContent = description;
  datasBigPictures.textContent = likes;
  likesBigPicture.textContent = likes;
  datasBigPictures.id = id;
  commentsBigPicture.textContent = comments.length;
};

const updateCommentCount = (updateComments) => {

  const showingComments = document.querySelectorAll('.social__comment');
  const countComments = document.querySelector('.social__comment-count');
  const commentCountElement = document.querySelector('.social__comment-count');
  const commentsCountElement = document.createElement('span');

  countComments.textContent = '';
  commentsCountElement.classList.add('comments-count');
  commentsCountElement.textContent = `${showingComments.length} из ${updateComments.length} комментариев`;
  commentCountElement.appendChild(commentsCountElement);

  if (showingComments.length >= updateComments.length) {
    BUTTON_ADD_COMMENTS.classList.add('hidden');
  }
};

const onShowBigPicture = (copyArrayPhoto) => {

  const SMALL_PICTURES = document.querySelectorAll('.picture');
  const buttonShowComments = document.querySelector('.comments-loader');

  for (const clickToSmallPhoto of SMALL_PICTURES) {

    clickToSmallPhoto.addEventListener('click', (evt) => {
      evt.preventDefault();

      BIG_PICTURE.classList.remove('hidden');
      fillBigPhotoDiscriptions(copyArrayPhoto[+evt.target.id]);
      showFiveComments(copyArrayPhoto[addButtonShowComments.id].comments);
      updateCommentCount(copyArrayPhoto[+evt.target.id].comments);
    });
  }

  buttonShowComments.addEventListener('click', (evt) => {
    evt.preventDefault();

    showFiveComments(copyArrayPhoto[addButtonShowComments.id].comments);
    updateCommentCount(copyArrayPhoto[addButtonShowComments.id].comments);
  });
};

//функция закрывающая большую картинку
const onCloseBigPhoto = () => {

  const buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
  const modalOpen = document.querySelector('body');

  buttonCloseBigPicture.addEventListener('click', (evt) => {
    evt.preventDefault();

    BUTTON_ADD_COMMENTS.classList.remove('hidden');
    closeCountComments(COMMENTS_COUNTER_VALUES);
    modalOpen.classList.remove('modal-open');
    BIG_PICTURE.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {

    if(evt.key === 'Escape'){
      evt.preventDefault();

      BUTTON_ADD_COMMENTS.classList.remove('hidden');
      closeCountComments(COMMENTS_COUNTER_VALUES);
      modalOpen.classList.remove('modal-open');
      BIG_PICTURE.classList.add('hidden');
    }
  });
};

export {onShowBigPicture, onCloseBigPhoto, updateCommentCount, fillBigPhotoDiscriptions};

