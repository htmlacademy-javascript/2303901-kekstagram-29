import {postDatesFormToServer} from './working-with-server.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_MAX_COUNT = 5;
const FILES_LENGTH = 0;
const fileInput = document.querySelector('.img-upload__input');
const formDownloadPicture = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const buttonCloseForm = formDownloadPicture.querySelector('.img-upload__cancel');
const overlay = formDownloadPicture.querySelector('.img-upload__overlay');
const inputHashTeg = formDownloadPicture.querySelector('.text__hashtags');
const inputComment = formDownloadPicture.querySelector('.text__description');
const slider = document.querySelector('.effect-level__slider');
const levelEffects = document.querySelector('.img-upload__effect-level ');
const buttonSendForm = document.querySelector('.img-upload__submit');
const previewImage = document.querySelector('.img-upload__preview').querySelector('img');

const pristine = new Pristine(formDownloadPicture, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});

const resetPristine = () => pristine.reset();

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);

  return (
    value === '' ||
    hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag) && hashtag.length <= HASHTAG_MAX_LENGTH)
  );
};

pristine.addValidator(inputHashTeg, validateHashtags, 'Хэштеги содержат недопустимые символы');

const validateHashtagsLength = (value) => {
  const hashtags = value.split(' ');

  return (hashtags.every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH));
};

pristine.addValidator(inputHashTeg, validateHashtagsLength, 'Длина хэштега не может превышать 20 символов.');


const validateHashtagsUnique = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((hashtag) => hashtag !== '').map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);

  return (value === '' || uniqueHashtags.size === hashtags.length);
};

pristine.addValidator(inputHashTeg, validateHashtagsUnique, 'Все хэш тэги должны быть уникальными');

const validateHashtagsCount = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((hashtag) => hashtag !== '');

  return (value === '' || hashtags.length <= HASHTAGS_MAX_COUNT);
};

pristine.addValidator(inputHashTeg, validateHashtagsCount, 'Максимальное количество хэш тэгов 5');

const valueInputComment = (value) => {
  const MessageTerms = {
    START: 0,
    MIN: 1,
    MAX: 140,
  };

  return (value.length === MessageTerms.START || value.length > MessageTerms.MIN && value.length < MessageTerms.MAX);
};

pristine.addValidator(inputComment, valueInputComment , 'не меньше двух не больше 140');

const onFileChange = (evt) => {
  evt.preventDefault();

  if(fileInput.value.length > FILES_LENGTH) {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }
};

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

const onFormCloseEscape = (evt) => {
  if(evt.key === 'Escape'){
    evt.stopPropagation();
    onFormClose(evt);
  }
};

formDownloadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  if (pristine.validate(inputHashTeg) && pristine.validate(inputComment)) {
    postDatesFormToServer(formData);
    pristine.reset();
    buttonSendForm.disabled = true;
  }
});

const onFocus = () => {
  document.removeEventListener('keydown', onFormCloseEscape);
};

const onFocusOut = () => {
  document.addEventListener('keydown', onFormCloseEscape);
};

fileInput.addEventListener('change', onFileChange);
buttonCloseForm.addEventListener('click', onFormClose);
document.addEventListener('keydown', onFormCloseEscape);
inputHashTeg.addEventListener('focus', onFocus);
inputHashTeg.addEventListener('blur', onFocusOut);
inputComment.addEventListener('focus', onFocus);
inputComment.addEventListener('blur', onFocusOut);

export {onFormClose, resetPristine, onFormCloseEscape};

