import {createCounter} from './add-comments.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const BUTTON_ADD_COMMENTS = document.querySelector('.comments-loader');
const COMMENTS_COUNTER_VALUES = 0;
const addButtonShowComments = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');
const {closeCountComments, showFiveComments} = createCounter();

const fillBigPhotoDescriptions = ({description, url, likes, comments,id}) => {
  const datesBigPictures = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');
  const likesBigPicture = BIG_PICTURE.querySelector('.likes-count');
  const commentsBigPicture = BIG_PICTURE.querySelector('.comments-count');
  const descriptionBigPhoto = document.querySelector('.social__header').querySelector('.social__caption');
  const modalOpen = document.querySelector('body');

  modalOpen.classList.add('modal-open');
  datesBigPictures.src = url;
  datesBigPictures.alt = description;
  descriptionBigPhoto.textContent = description;
  datesBigPictures.textContent = likes;
  likesBigPicture.textContent = likes;
  datesBigPictures.id = id;
  commentsBigPicture.textContent = comments.length;
};

const updateCommentCount = (updateComments) => {
  const showingComments = document.querySelectorAll('.social__comment');
  const countComments = document.querySelector('.social__comment-count');
  const maxLengthComments = document.querySelector('.comments-count');
  const placeAddComments = document.querySelector('.social__comments');
  const countCommentsHTML = `${showingComments.length} из`;
  const maxLengthCommentsHTML = `${updateComments.length}`;

  countComments.textContent = countCommentsHTML;
  maxLengthComments.textContent = maxLengthCommentsHTML;

  if (!countComments) {
    const commentsCountHTML = `<div class="social__comment-count">${countCommentsHTML} из <span class="comments-count">${updateComments.length}</span> комментариев</div>`;
    placeAddComments.insertAdjacentHTML('beforebegin', commentsCountHTML);
  }

  countComments.innerHTML = `${showingComments.length} из <span class="comments-count">${updateComments.length}</span> комментариев`;

  if (showingComments.length >= updateComments.length) {
    BUTTON_ADD_COMMENTS.classList.add('hidden');
  }
};

const setupOnShowBigPicture = () => {
  let onSmallPictureClick;
  let onShowCommentsClick;

  const onShowBigPictures = (arrayPhoto) => {
    const SMALL_PICTURES = document.querySelectorAll('.picture');
    const buttonShowComments = document.querySelector('.comments-loader');

    if (onSmallPictureClick) {
      SMALL_PICTURES.forEach((clickToSmallPhoto) => {
        clickToSmallPhoto.removeEventListener('click', onSmallPictureClick);
      });
    }

    if (onShowCommentsClick) {
      buttonShowComments.removeEventListener('click', onShowCommentsClick);
    }

    onSmallPictureClick = (evt) => {
      evt.preventDefault();

      arrayPhoto.forEach((element) => {

        if (element.id === +evt.target.id) {
          fillBigPhotoDescriptions(element);
          showFiveComments(element.comments);
          updateCommentCount(element.comments);
        }
      });
      BIG_PICTURE.classList.remove('hidden');
    };

    onShowCommentsClick = (evt) => {
      evt.preventDefault();

      arrayPhoto.forEach((element) => {

        if (+element.id === +addButtonShowComments.id) {
          showFiveComments(element.comments);
          updateCommentCount(element.comments);
        }
      });
    };

    SMALL_PICTURES.forEach((clickToSmallPhoto) => {
      clickToSmallPhoto.addEventListener('click', onSmallPictureClick);
    });

    buttonShowComments.addEventListener('click', onShowCommentsClick);
  };

  return onShowBigPictures;
};

const getDescriptionBigPicture = setupOnShowBigPicture();

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

    if(evt.key === 'Escape') {
      evt.preventDefault();
      BUTTON_ADD_COMMENTS.classList.remove('hidden');
      closeCountComments(COMMENTS_COUNTER_VALUES);
      modalOpen.classList.remove('modal-open');
      BIG_PICTURE.classList.add('hidden');
    }
  });
};

export {getDescriptionBigPicture, onCloseBigPhoto, updateCommentCount};

