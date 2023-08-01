import {onFormClose, resetPristine, onFormCloseEscape} from './validation-photo-description.js';
import {postPicturesFromServer} from './main.js';

const buttonSendForm = document.querySelector('.img-upload__submit');
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.querySelector('.error');
const placeClickToClose = errorMessageTemplate.querySelector('.error__inner');
const tagBody = document.querySelector('body');
const errorButton = errorMessage.querySelector('.error__button');
const showFilters = document.querySelector('.img-filters');
const successfulSendMessageTemplate = document.querySelector('#success').content;
const successfulSendMessage = successfulSendMessageTemplate.querySelector('.success');
const buttonCloseSuccess = successfulSendMessage.querySelector('.success__button');
const placeClickToSuccessInner = successfulSendMessage.querySelector('.success__inner');

const showErrorMessage = () => {
  tagBody.insertAdjacentElement('beforeend', errorMessage);
  document.removeEventListener('keydown', onFormCloseEscape);
};

const onCloseErrorWindowButton = () => {
  errorMessage.remove();
  document.addEventListener('keydown', onFormCloseEscape);
};

const onCloseErrorWindowEck = (evt) => {
  if (evt.key === 'Escape') {
    onCloseErrorWindowButton(evt);
  }
};

const onCloseErrorWindowClick = (evt) => {
  if(placeClickToClose.contains(evt.target)) {
    return;
  }
  onCloseErrorWindowButton(evt);
};

errorMessage.addEventListener('click', onCloseErrorWindowClick);
errorButton.addEventListener('click', onCloseErrorWindowButton);
document.addEventListener('keydown', onCloseErrorWindowEck);

const showSuccessWindow = () => {
  tagBody.insertAdjacentElement('beforeend', successfulSendMessage);
};

const onCloseSuccessWindow = () => {
  successfulSendMessage.remove();
};

const onCloseSuccessWindowEck = (evt) => {
  if (evt.key === 'Escape' && successfulSendMessage.classList.contains('success')) {
    onCloseSuccessWindow();
  }
};

const onCloseSuccessWindowClick = (evt) => {
  if(placeClickToSuccessInner.contains(evt.target)){
    return;
  }
  onCloseSuccessWindow(evt);
};

buttonCloseSuccess.addEventListener('click', onCloseSuccessWindow);
successfulSendMessage.addEventListener('click', onCloseSuccessWindowClick);
document.addEventListener('keydown', onCloseSuccessWindowEck);

const messageErrorDownload = () => {
  const messageFallServer = document.createElement('div');
  const tagDivForMessage = document.createElement('div');

  messageFallServer.classList.add('message-fall');
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
    .then((datesPictures) => {
      postPicturesFromServer(datesPictures);
    })
    .then(() => {
      showFilters.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      messageErrorDownload();
    });
};

getPicturesFromServer();

const postDatesFormToServer = (formData) => {
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

export {postDatesFormToServer, getPicturesFromServer};
