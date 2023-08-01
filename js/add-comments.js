const START_INDEX_COMMENTS = 0;
const VALUE_SHOWING_COMMENTS = 5;
const allCommentsForBigPicture = document.querySelector('.social__comments');

const createBlockComment = ({avatar, message, name}) => {
  const oneComment = document.createElement('li');
  const photoAvatar = document.createElement('img');
  const textComment = document.createElement('p');

  oneComment.classList.add('social__comment');
  photoAvatar.classList.add('social__picture');
  photoAvatar.alt = name;
  photoAvatar.src = avatar;
  textComment.classList.add('social__text');
  textComment.textContent = message;
  oneComment.append(photoAvatar);
  oneComment.append(textComment);

  return oneComment;
};

const addIncomingComments = (comments) => {
  const commentsToPhoto = document.querySelector('.social__comments');
  const fragmentComments = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragmentComments.append(createBlockComment(comment));
  });

  commentsToPhoto.append(fragmentComments);
};

const createCounter = () => {
  let countShowComments = 0;

  const closeCountComments = (resetCountComment) => {
    countShowComments = resetCountComment;
  };

  const showFiveComments = (commentsToPhoto) => {
    countShowComments += VALUE_SHOWING_COMMENTS;
    allCommentsForBigPicture.innerHTML = '';
    addIncomingComments(commentsToPhoto.slice(START_INDEX_COMMENTS, countShowComments));
  };

  return {closeCountComments, showFiveComments};
};

export {createCounter};
