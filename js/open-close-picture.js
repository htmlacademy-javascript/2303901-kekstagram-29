import {BIG_PICTURE, BUTTON_ADD_COMMENTS, showToNewFiveComments, closeCountComments,showFiveComments,copyArrayPhoto} from './aad-comments.js';

const COMMENTS_COUNTER_VALUES = 5;
const SMALL_PICTURES = document.querySelectorAll('.picture');
const buttonShowComments = document.querySelector('.comments-loader');
const addButtonShowComments = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');

const onShowBigPicture = () => {
  for(const clickToSmallPhoto of SMALL_PICTURES) {
    clickToSmallPhoto.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFiveComments(evt.target);
    });
  }
};
onShowBigPicture();


const onShowMoreComments = () => {
  buttonShowComments.addEventListener('click', (evt) => {
    evt.preventDefault();
    showToNewFiveComments(copyArrayPhoto[addButtonShowComments.id - 1].comments);

    const showingComments = document.querySelector('.comments-count');
    const countComments = document.querySelector('.social__comment-count');

    console.log(countComment)
    console.log(showingComments.length + 'счетчик')
  });
};
onShowMoreComments();

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
    evt.preventDefault();
    if(evt.key === 'Escape'){

      closeCountComments(COMMENTS_COUNTER_VALUES);
      modalOpen.classList.remove('modal-open');
      BIG_PICTURE.classList.add('hidden');
    }
  });
};
onCloseBigPhoto();

