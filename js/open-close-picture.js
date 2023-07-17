import {
  showToNewFiveComments,
  closeCountComments,
  showFiveComments,
} from './aad-comments.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const BUTTON_ADD_COMMENTS = document.querySelector('.comments-loader');
const COMMENTS_COUNTER_VALUES = 5;

const addButtonShowComments = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');

const updateCommentCount = (copyArrayPhoto) => {
  const showingComments = document.querySelectorAll('.social__comment');
  const countComments = document.querySelector('.social__comment-count');
  const commentCountElement = document.querySelector('.social__comment-count');
  const commentsCountElement = document.createElement('span');

  countComments.textContent = '';
  commentsCountElement.classList.add('comments-count');
  commentsCountElement.textContent = `${showingComments.length} из ${copyArrayPhoto.copy[addButtonShowComments.id - 1].comments.length} комментариев`;
  commentCountElement.appendChild(commentsCountElement);

  if (showingComments.length >= copyArrayPhoto.copy[addButtonShowComments.id - 1].comments.length) {
    BUTTON_ADD_COMMENTS.classList.add('hidden');
  }
};

const onShowBigPicture = (copyArrayPhoto) => {
  const SMALL_PICTURES = document.querySelectorAll('.picture');

  for (const clickToSmallPhoto of SMALL_PICTURES) {
    clickToSmallPhoto.addEventListener('click', (evt) => {
      evt.preventDefault();

      showFiveComments(copyArrayPhoto, evt.target);
      updateCommentCount(copyArrayPhoto);
    });
  }
};

const onShowMoreComments = (copyArrayPhoto) => {
  const buttonShowComments = document.querySelector('.comments-loader');

  buttonShowComments.addEventListener('click', (evt) => {
    evt.preventDefault();

    showToNewFiveComments(copyArrayPhoto.copy[addButtonShowComments.id - 1].comments);
    updateCommentCount(copyArrayPhoto);
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

export {onShowBigPicture, onShowMoreComments, onCloseBigPhoto, updateCommentCount};
