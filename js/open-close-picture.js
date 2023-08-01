import {createCounter} from './add-comments.js';

const COMMENTS_COUNTER_VALUES = 0;
const bigPicture = document.querySelector('.big-picture');
const buttonAddComments = document.querySelector('.comments-loader');
const {closeCountComments, showFiveComments} = createCounter();

const fillBigPhotoDescriptions = ({description, url, likes, comments,id}) => {
  const datesBigPictures = bigPicture.querySelector('.big-picture__img ').querySelector('img');
  const likesBigPicture = bigPicture.querySelector('.likes-count');
  const commentsBigPicture = bigPicture.querySelector('.comments-count');
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
    buttonAddComments.classList.add('hidden');
  }
};

const listenCloseBigPicture = (...closingCallbacks) => {
  const buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
  const modalOpen = document.querySelector('body');

  function onClose() {
    buttonAddComments.classList.remove('hidden');
    closeCountComments(COMMENTS_COUNTER_VALUES);
    modalOpen.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    closingCallbacks?.map((callback) => callback?.());
    buttonCloseBigPicture.removeEventListener('click', onClose);
    document.removeEventListener('keydown', onCloseEsc);
  }

  function onCloseEsc(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  buttonCloseBigPicture.addEventListener('click', onClose);
  document.addEventListener('keydown', onCloseEsc);
};

const showBigPicture = (picture) => {
  const buttonShowComments = document.querySelector('.comments-loader');

  const onShowCommentsClick = () => {
    showFiveComments(picture.comments);
    updateCommentCount(picture.comments);
  };

  fillBigPhotoDescriptions(picture);
  onShowCommentsClick();
  bigPicture.classList.remove('hidden');
  buttonShowComments.addEventListener('click', onShowCommentsClick);
  listenCloseBigPicture(() => buttonShowComments.removeEventListener('click', onShowCommentsClick));
};

const setupOnShowBigPicture = () => {
  let onSmallPictureClick;

  const onShowBigPictures = (arrayPhoto) => {
    const smallPictures = document.querySelectorAll('.picture');

    if (onSmallPictureClick) {
      smallPictures.forEach((clickToSmallPhoto) => {
        clickToSmallPhoto.removeEventListener('click', onSmallPictureClick);
      });
    }

    onSmallPictureClick = (evt) => {
      evt.preventDefault();

      const clickedPicture = arrayPhoto.find((element) => element.id === +evt.target.id);
      showBigPicture(clickedPicture);
    };

    smallPictures.forEach((clickToSmallPhoto) => {
      clickToSmallPhoto.addEventListener('click', onSmallPictureClick);
    });

  };

  return onShowBigPictures;
};

const handleClickSmallMiniature = setupOnShowBigPicture();

export {handleClickSmallMiniature};
