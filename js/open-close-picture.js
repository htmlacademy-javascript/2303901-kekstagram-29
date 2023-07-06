import {BIG_PICTURE,SMALL_PICTURES, createContentBigPhoto, getInfoComment, } from './aad-comments.js';

// функция открывающая большую картинку
const onChangeBigPicture = () => {

  SMALL_PICTURES.forEach((clickPicture, iterationPhoto) => {

    clickPicture.addEventListener('click', () => {


      createContentBigPhoto(clickPicture);
      getInfoComment(iterationPhoto);
    });
  });
};
onChangeBigPicture();

//функция закрывающая большую картинку
const onCloseBigPhoto = () => {
  const buttonCloseBigPicture = document.querySelector('.big-picture__cancel');

  buttonCloseBigPicture.addEventListener('click', () => {
    const modalOpen = document.querySelector('body');

    modalOpen.classList.remove('modal-open');
    BIG_PICTURE.classList.add('hidden');
  });
};
onCloseBigPhoto();

const onCloseBigPhotoEsc = () =>{

  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if(evt.key === 'Escape'){
      const modalOpen = document.querySelector('body');


      modalOpen.classList.remove('modal-open');
      BIG_PICTURE.classList.add('hidden');
    }
  });
};
onCloseBigPhotoEsc();
