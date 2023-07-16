//адресса картинок
const BIG_PICTURE = document.querySelector('.big-picture');
const ALL_COMENTS_FOR_BIG_PICTURE = document.querySelector('.social__comments');
const START_INDEX_COMMENTS = 0;


// функция заполняющая большую картинку описаниями из маленькой картинки
const fillBigPhotoDiscriptions = ({discription, url, likes, comments,id}) => {

  const datasBigPictures = BIG_PICTURE.querySelector('.big-picture__img ').querySelector('img');
  const likesBigPicture = BIG_PICTURE.querySelector('.likes-count');
  const commentsBigPicture = BIG_PICTURE.querySelector('.comments-count');
  const discriptionBigPhoto = BIG_PICTURE.querySelector('.social__caption');
  const modalOpen = document.querySelector('body');

  modalOpen.classList.add('modal-open');
  BIG_PICTURE.classList.remove('hidden');
  datasBigPictures.src = url;
  datasBigPictures.alt = discription;
  discriptionBigPhoto.textContent = discription;
  datasBigPictures.textContent = likes;
  likesBigPicture.textContent = likes;
  datasBigPictures.id = id;
  commentsBigPicture.textContent = comments.length;
};

//функция по созданию коментариев пользователей
const createBlockComment = ({avatar, message, name}) => {


  const oneComment = document.createElement('li');
  oneComment.classList.add('social__comment');

  const photoAvatar = document.createElement('img');
  photoAvatar.classList.add('social__picture');
  photoAvatar.alt = name;
  photoAvatar.src = avatar;

  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = message;

  oneComment.append(photoAvatar);
  oneComment.append(textComment);

  return oneComment;
};

// функция coбирающая коментарии
const getAllComments = (comments) => {

  const commentsToPhoto = document.querySelector('.social__comments');
  const fragmentComments = document.createDocumentFragment();

  //массив комментов
  comments.forEach((comment) => {

    fragmentComments.append(createBlockComment(comment));

  });
  commentsToPhoto.append(fragmentComments);
};


let countShowComments = 5;
//сброс счетчика и обработчика событий для комментариев
const closeCountComments = (resetCountComment) => {

  countShowComments = resetCountComment;
};

//показ первых пяти комментариев
const showFiveComments = (copyArrayPhoto, idComment) => {

  const comments = copyArrayPhoto.copy[+idComment.id - 1].comments;
  ALL_COMENTS_FOR_BIG_PICTURE.innerHTML = '';

  fillBigPhotoDiscriptions(copyArrayPhoto.copy[+idComment.id - 1]);
  getAllComments(comments.slice(START_INDEX_COMMENTS, countShowComments));
};

//показ следующих пяти комментариев
const showToNewFiveComments = (iterationPhoto) => {

  countShowComments += 5;
  ALL_COMENTS_FOR_BIG_PICTURE.innerHTML = '';
  getAllComments(iterationPhoto.slice(START_INDEX_COMMENTS, countShowComments));
};

export {
  showToNewFiveComments,
  closeCountComments,
  showFiveComments,
};
