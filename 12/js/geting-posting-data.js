import {paintAllPictures} from './thumbnail-rendering.js';
import {onShowBigPicture} from './open-close-picture.js';
import {onFormClose} from './form-create-picture.js';

//сообщение об ошибке
const buttonSendForm = document.querySelector('.img-upload__submit');
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.querySelector('.error');
const placeClickToClose = errorMessageTemplate.querySelector('.error__inner');
const tagBody = document.querySelector('body');
const errorButton = errorMessage.querySelector('.error__button');

const showErrorMessage = () => {

  tagBody.insertAdjacentElement('beforeend', errorMessage);
};

const closeErrorWindowButton = (evt) => {

  evt.preventDefault();
  errorMessage.remove();
};

const closeErrorWindowEsk = (evt) => {

  if (evt.key === 'Escape' && document.documentElement.classList.contains('error')) {
    closeErrorWindowButton(evt);
  }
};

const closeErrorWindowClick = (evt) => {
  evt.preventDefault();

  if(!placeClickToClose.contains(evt.target)){

    evt.stopPropagation();
    closeErrorWindowButton(evt);
  }
};

errorMessage.addEventListener('click', closeErrorWindowClick);
errorButton.addEventListener('click', closeErrorWindowButton);
document.addEventListener('keydown', closeErrorWindowEsk);

//сообщение успешной отправки
const trueSendMessageTemplate = document.querySelector('#success').content;
const trueSendMessage = trueSendMessageTemplate.querySelector('.success');
const buttonCloseSuccess = trueSendMessage.querySelector('.success__button');
const plaseClickToSuccessInner = trueSendMessage.querySelector('.success__inner');

const showSuccessWindow = () => {
  tagBody.insertAdjacentElement('beforeend', trueSendMessage);
};

const closeSuccessWindow = (evt) => {

  evt.preventDefault();
  trueSendMessage.remove();
};

const closeSuccessWindowEsk = (evt) => {

  if (evt.key === 'Escape' && trueSendMessage.classList.contains('success')) {
    closeSuccessWindow(evt);
  }
};

const closeSuccessWindowClisk = (evt) => {
  evt.preventDefault();

  if(!plaseClickToSuccessInner.contains(evt.target)){

    evt.stopPropagation();
    closeSuccessWindow(evt);
  }
};

buttonCloseSuccess.addEventListener('click', closeSuccessWindow);
trueSendMessage.addEventListener('click', closeSuccessWindowClisk);
document.addEventListener('keydown', closeSuccessWindowEsk);

const messageOkDownlofd = () => {

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
      onShowBigPicture(datasPictures);

    })
    .catch(() => {

      messageOkDownlofd();
    });
};

getPicturesFromServer();

const postDatasFormToServer = (formData) => {

  fetch('https://29.javascript.pages.academy/kekstagram/data', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  })

    .then((response) => {

      if (response.ok) {

        return response.json();
      }
      throw new Error('Network response was not ok.');
    })

    .then(() => {
      onFormClose();
      showSuccessWindow();
    })
    .catch(() => {

      showErrorMessage();
      buttonSendForm.disabled = false;
    });
};

export {postDatasFormToServer};

