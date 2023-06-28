import { addPhotos } from './photo-generator.js';

//поиск клона шаблона
const THEMPLATE_PICTURE = document.querySelector('#picture').content;
const THEMPLATE_PICTURE_TEG = THEMPLATE_PICTURE.querySelector('.picture');

//функция собирающая коллекцию фото с описаниями
const collectAllPhotos = function () {

  //места вставки клона на страницу
  const addToHtml = document.querySelector('.pictures');
  // создание фрагмента
  const fragmentPhoto = document.createDocumentFragment();
  // извлечение из функции массива
  const getArrayPhoto = addPhotos();

  // перебор масиива и присваивание значений шаблону
  getArrayPhoto.forEach((value) => {
    const copyTemplateTeg = THEMPLATE_PICTURE_TEG.cloneNode(true);
    const pictureImg = copyTemplateTeg.querySelector('.picture__img');
    const pictureComments = copyTemplateTeg.querySelector('.picture__comments');
    const pictureLikes = copyTemplateTeg.querySelector('.picture__likes');

    pictureImg.src = value.url;
    pictureImg.alt = value.discription;
    pictureLikes.textContent = value.likes;
    pictureComments.textContent = value.comments.length;
    fragmentPhoto.appendChild(copyTemplateTeg);
  });
  addToHtml.appendChild(fragmentPhoto);
};

collectAllPhotos();


//console.log(THEMPLATE_PICTURE_TEGS);
//console.log(COPY_TEMPLATE_TEGS);
//console.log(addToHtml);
//console.log(addPhotos());
