import {postDatasFormToServer} from './geting-posting-data.js';

const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASTAG_MAX_LENGTH = 20;
const HASTAGS_MAX_COUNT = 5;
const FIELS_LENGTH = 0;
const fileInput = document.querySelector('.img-upload__input');
const formDownloadPicture = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const buttonCloseForm = formDownloadPicture.querySelector('.img-upload__cancel');
const overlay = formDownloadPicture.querySelector('.img-upload__overlay');
const inputHeshTeg = formDownloadPicture.querySelector('.text__hashtags');
const inputComment = formDownloadPicture.querySelector('.text__description');
const slider = document.querySelector('.effect-level__slider');
const levelEffects = document.querySelector('.img-upload__effect-level ');

const buttonSendForm = document.querySelector('.img-upload__submit');
const previewImage = document.querySelector('.img-upload__preview').querySelector('img');

// подключение пристин
const pristine = new Pristine(formDownloadPicture,{
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});

const resetPristine = () =>{
  pristine.reset();
} ;

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);

  return (
    value === '' ||
    hashtags.every((hashtag) => HASTAG_REGEX.test(hashtag) && hashtag.length <= HASTAG_MAX_LENGTH)
  );
};
pristine.addValidator(inputHeshTeg, validateHashtags, 'Хэштеги содержат недопустимые символы');


const validateHashtagsLength = (value) => {
  const hashtags = value.split(' ');

  return (hashtags.every((hashtag) => hashtag.length <= HASTAG_MAX_LENGTH));

};

pristine.addValidator(inputHeshTeg, validateHashtagsLength, 'Длина хэштега не может превышать 20 символов.');


const validateHashtagsUnique = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((hashtag) => hashtag !== '').map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);

  return (value === '' || uniqueHashtags.size === hashtags.length);
};

pristine.addValidator(inputHeshTeg, validateHashtagsUnique, 'Все хэш тэги должны быть уникальными');


const validateHashtagsCount = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((hashtag) => hashtag !== '');

  return (value === '' || hashtags.length <= HASTAGS_MAX_COUNT);
};

pristine.addValidator(inputHeshTeg, validateHashtagsCount, 'Максимальное количество хэш тэгов 5');


//валидация комментария
const valueInputComment = (value) => {
  const MessageTerms = {
    START: 0,
    MIN: 1,
    MAX: 140,
  };

  return (value.length === MessageTerms.START || value.length > MessageTerms.MIN && value.length < MessageTerms.MAX);

};

pristine.addValidator(inputComment, valueInputComment , 'не меньше двух не больше 140');

//обработчик события изменения значения поля ввода файла
const onFileChange = (evt) => {

  evt.preventDefault();

  if(fileInput.value.length > FIELS_LENGTH) {

    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }
};


//Закрытыие формы ввода
const onFormClose = () => {

  levelEffects.classList.add('hidden');
  slider.classList.add('hidden');
  slider.noUiSlider.reset();
  pristine.reset();
  formDownloadPicture.reset();
  buttonSendForm.disabled = false;
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  previewImage.style = '';
};

//Закрытыие формы ввода esc
const onFormCloseEscape = (evt) => {

  if(evt.key === 'Escape'){

    evt.stopPropagation();
    onFormClose(evt);
  }
};


//блокировка отправки формы
formDownloadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  if (pristine.validate(inputHeshTeg) && pristine.validate(inputComment)) {

    postDatasFormToServer(formData);
    pristine.reset();
    buttonSendForm.disabled = true;
  }
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

export {onFormClose, resetPristine, onFormCloseEscape};
