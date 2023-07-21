const ALL_COMENTS_FOR_BIG_PICTURE = document.querySelector('.social__comments');
const START_INDEX_COMMENTS = 0;

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

// функция добавления комментариев
const addIncomingComments = (comments) => {

  const commentsToPhoto = document.querySelector('.social__comments');
  const fragmentComments = document.createDocumentFragment();

  //массив комментов
  comments.forEach((comment) => {

    fragmentComments.append(createBlockComment(comment));

  });
  commentsToPhoto.append(fragmentComments);
};

const createCounter = () => {

  let countShowComments = 0;

  //сброс счетчика и обработчика событий для комментариев
  const closeCountComments = (resetCountComment) => {

    countShowComments = resetCountComment;
  };

  //показ первых пяти комментариев
  const showFiveComments = (commentsToPhoto) => {

    countShowComments += 5;
    ALL_COMENTS_FOR_BIG_PICTURE.innerHTML = '';

    addIncomingComments(commentsToPhoto.slice(START_INDEX_COMMENTS, countShowComments));
  };

  return {closeCountComments, showFiveComments};
};


export {createCounter};
