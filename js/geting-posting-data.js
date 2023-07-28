
import {onFormClose, resetPristine, onFormCloseEscape} from './form-create-picture.js';
import {addSortToPhotos} from './photo-filters.js';
import {paintAllPictures} from './thumbnail-rendering.js';

//сообщение об ошибке
const buttonSendForm = document.querySelector('.img-upload__submit');
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.querySelector('.error');
const placeClickToClose = errorMessageTemplate.querySelector('.error__inner');
const tagBody = document.querySelector('body');
const errorButton = errorMessage.querySelector('.error__button');
const showFilters = document.querySelector('.img-filters');

const showErrorMessage = () => {

  tagBody.insertAdjacentElement('beforeend', errorMessage);
  document.removeEventListener('keydown', onFormCloseEscape);

};

const closeErrorWindowButton = (evt) => {

  evt.preventDefault();
  errorMessage.remove();
  document.addEventListener('keydown', onFormCloseEscape);
};

const closeErrorWindowEck = (evt) => {

  if (evt.key === 'Escape') {
    closeErrorWindowButton(evt);
    evt.stopPropagation();
  }
};

const closeErrorWindowClick = (evt) => {
  evt.preventDefault();

  if(placeClickToClose.contains(evt.target)){

    return;
  }
  evt.stopPropagation();
  closeErrorWindowButton(evt);

};

errorMessage.addEventListener('click', closeErrorWindowClick);
errorButton.addEventListener('click', closeErrorWindowButton);
document.addEventListener('keydown', closeErrorWindowEck);

//сообщение успешной отправки
const successfulSendMessageTemplate = document.querySelector('#success').content;
const successfulSendMessage = successfulSendMessageTemplate.querySelector('.success');
const buttonCloseSuccess = successfulSendMessage.querySelector('.success__button');
const plaseClickToSuccessInner = successfulSendMessage.querySelector('.success__inner');

const showSuccessWindow = () => {
  tagBody.insertAdjacentElement('beforeend', successfulSendMessage);
};

const closeSuccessWindow = () => {

  successfulSendMessage.remove();
};

const closeSuccessWindowEck = (evt) => {

  if (evt.key === 'Escape' && successfulSendMessage.classList.contains('success')) {
    closeSuccessWindow(evt);
  }
};

const closeSuccessWindowClisk = (evt) => {
  evt.preventDefault();

  if(plaseClickToSuccessInner.contains(evt.target)){

    return;
  }

  evt.stopPropagation();
  closeSuccessWindow(evt);
};

buttonCloseSuccess.addEventListener('click', closeSuccessWindow);
successfulSendMessage.addEventListener('click', closeSuccessWindowClisk);
document.addEventListener('keydown', closeSuccessWindowEck);

const messageErrorDownload = () => {

  const messageFallServer = document.createElement('div');
  messageFallServer.classList.add('message-fall');

  const tagDivForMessage = document.createElement('div');
  tagDivForMessage.classList.add('message-server');
  tagDivForMessage.textContent = 'Произошла ошибка. Попробуйте перезагрузить страницу';
  messageFallServer.appendChild(tagDivForMessage);
  tagBody.appendChild(messageFallServer);
};

const getPicturesFromServer = () => {
  fetch('https://29.javascript.pages.academy/kekstagram/data', {
    method: 'GET',
    credentials: 'same-origin'
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((datasPictures) => {

      paintAllPictures(datasPictures);
      addSortToPhotos(datasPictures);
    })
    .then(() => {

      showFilters.classList.remove('img-filters--inactive');

    })
    .catch(() => {

      messageErrorDownload();
    });
};

getPicturesFromServer();

const postDatasFormToServer = (formData) => {

  fetch('https://29.javascript.pages.academy/kekstagram', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData

  })

    .then((response) => {

      if (response.ok) {


        return onFormClose();
      }
      throw new Error('Network response was not ok.');
    })

    .then(() => {

      resetPristine();
      showSuccessWindow();
    })
    .catch(() => {

      showErrorMessage();
      buttonSendForm.disabled = false;
    });
};


export {postDatasFormToServer};