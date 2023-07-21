const fileInput = document.querySelector('.img-upload__input');
const formDownloadPictyre = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const buttonCloseForm = formDownloadPictyre.querySelector('.img-upload__cancel');
const overlay = formDownloadPictyre.querySelector('.img-upload__overlay');
const inputHeshTeg = formDownloadPictyre.querySelector('.text__hashtags');
const inputComment = formDownloadPictyre.querySelector('.text__description');
const slider = document.querySelector('.img-upload__effect-level');
const previewImage = document.querySelector('.img-upload__preview');

// подключение пристин
const pristine = new Pristine(formDownloadPictyre,{
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});

//валидация хэш тега
const validateHashtags = (value) => {
  const hashtags = value.split(' ');

  const firstCondition = /^#[a-zа-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set(hashtags);
  const trimmedHashtags = hashtags.map((tag) => tag.trim());

  return (
    (hashtags.every((tag) => firstCondition.test(tag)) &&
      uniqueHashtags.size === hashtags.length &&
      hashtags.length <= 5) ||
    (trimmedHashtags.length === hashtags.length && value.length === 0)
  );
};

pristine.addValidator(inputHeshTeg, validateHashtags , 'ХЭШЕ');

// валидация комментария
const valueInputComment = (value) => {
  const MessageTerms = {
    START: 0,
    MIN: 1,
    MAX: 140,
  };
  return value.length === MessageTerms.START || value.length > MessageTerms.MIN && value.length < MessageTerms.MAX;
};
pristine.addValidator(inputComment, valueInputComment , 'не меньше двух не больше 140');

//блокировка отправки формы
formDownloadPictyre.addEventListener('submit', (evt) => {

  if (!pristine.validate(inputHeshTeg) || !pristine.validate(inputComment)) {
    return evt.preventDefault();
  }
});


// Добавляем обработчик события изменения значения поля ввода файла
const onFileChange = (evt) => {

  evt.preventDefault();
  if(fileInput.value.length > 0) {

    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  }
};

//Закрытыие формы ввода
const onFormClose = (evt) => {

  evt.preventDefault();
  slider.noUiSlider.reset();
  formDownloadPictyre.reset();
  overlay.classList.add('hidden');
  slider.classList.add('hidden');
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
