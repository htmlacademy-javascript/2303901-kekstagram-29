import {onShowBigPicture, onShowMoreComments, onCloseBigPhoto} from './open-close-picture.js';
import './form-create-picture.js';
import {addPhotos} from './photo-generator.js';
import {paintAllPictures} from './thumbnail-rendering.js';

const copyArrayPhoto = {
  copy: addPhotos()
};
const BIG_PICTURE = {
  keybigPictyre: document.querySelector('.big-picture'),
};
console.log(BIG_PICTURE.keybigPictyre)

paintAllPictures(copyArrayPhoto.copy);
onShowBigPicture();
onShowMoreComments();
onCloseBigPhoto();

export {copyArrayPhoto, BIG_PICTURE};
