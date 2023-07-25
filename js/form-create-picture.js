import {postDatasFormToServer} from './geting-posting-data.js';

const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASTAG_MAX_LENGTH = 20;
const HASTAGS_MAX_COUNT = 5;
const fileInput = document.querySelector('.img-upload__input');
const formDownloadPictyre = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const buttonCloseForm = formDownloadPictyre.querySelector('.img-upload__cancel');
const overlay = formDownloadPictyre.querySelector('.img-upload__overlay');
const inputHeshTeg = formDownloadPictyre.querySelector('.text__hashtags');
const inputComment = formDownloadPictyre.querySelector('.text__description');
const slider = document.querySelector('.img-upload__effect-level');
const previewImage = document.querySelector('.img-upload__preview');
const buttonSendForm = document.querySelector('.img-upload__submit');


// подключение пристин
const pristine = new Pristine(formDownloadPictyre,{
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});


const validateHashtags = function (value) {
  const hashtags = value.split(' ');

  if (value === '') {
    pristine.reset();
    return true;
  }
  return hashtags.every((hashtag) => HASTAG_REGEX.test(hashtag));
};

pristine.addValidator(inputHeshTeg, validateHashtags, 'Хэштеги содержат недопустимые символы');


const validateHashtagsLength = (value) => {
  const hashtags = value.split(' ');

  return hashtags.every((hashtag) => hashtag.length <= HASTAG_MAX_LENGTH);
};

pristine.addValidator(inputHeshTeg, validateHashtagsLength, 'Длина хэштега не может превышать 20 символов.');


const validateHashtagsUnique = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
};

pristine.addValidator(inputHeshTeg, validateHashtagsUnique, 'Все хэш тэги должны быть уникальными');


const validateHashtagsCount = (value) => {
  const hashtags = value.split(' ');

  return hashtags.length <= HASTAGS_MAX_COUNT;
};

pristine.addValidator(inputHeshTeg, validateHashtagsCount, 'Максимальное количество хэш тэгов 5');


//валидация комментария
const valueInputComment = (value) => {
  const MessageTerms = {
    START: 0,
    MIN: 1,
    MAX: 140,
  };

  return value.length === MessageTerms.START || value.length > MessageTerms.MIN && value.length < MessageTerms.MAX;
};

pristine.addValidator(inputComment, valueInputComment , 'не меньше двух не больше 140');

//обработчик события изменения значения поля ввода файла
const onFileChange = (evt) => {

  evt.preventDefault();

  if(fileInput.value.length > 0) {

    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }
};


//Закрытыие формы ввода
const onFormClose = () => {

  //previewImage.removeAttribute('style');
  buttonSendForm.disabled = false;
  overlay.classList.add('hidden');
  slider.classList.add('hidden');
  body.classList.remove('modal-open');
  previewImage.style = '';
  previewImage.style = 'grayscale(1)';
  formDownloadPictyre.reset();
  pristine.reset();
  slider.noUiSlider.reset();
};

//Закрытыие формы ввода esc
const onFormCloseEscape = (evt) => {

  if(evt.key === 'Escape'){

    evt.stopPropagation();
    onFormClose(evt);
  }
};

//блокировка отправки формы
formDownloadPictyre.addEventListener('submit', (evt) => {

  const formData = new FormData(evt.target);

  evt.preventDefault();
  if (!pristine.validate(inputHeshTeg) || !pristine.validate(inputComment)) {

    return evt.preventDefault();
  }
  pristine.reset();
  buttonSendForm.disabled = true;
  postDatasFormToServer(formData);
});

//запрет закрытия поля воода при фокусе
const onFocus = () => {

  document.removeEventListener('keydown', onFormCloseEscape);
};

//разрешение открытия поля воода при фокусе
const onFocusOut = () => {

  document.addEventListener('keydown', onFormCloseEscape);
};

//обработчики
fileInput.addEventListener('change', onFileChange);
buttonCloseForm.addEventListener('click', onFormClose);
document.addEventListener('keydown', onFormCloseEscape);
inputHeshTeg.addEventListener('focus', onFocus);
inputHeshTeg.addEventListener('blur', onFocusOut);
inputComment.addEventListener('focus', onFocus);
inputComment.addEventListener('blur', onFocusOut);

export {onFormClose};

