import {onShowBigPicture, onShowMoreComments, onCloseBigPhoto} from './open-close-picture.js';
import './form-create-picture.js';
import {addPhotos} from './photo-generator.js';
import {paintAllPictures} from './thumbnail-rendering.js';

const copyArrayPhoto = {
  copy: addPhotos()
};


paintAllPictures(copyArrayPhoto.copy);
onShowBigPicture();
onShowMoreComments();
onCloseBigPhoto();

export {copyArrayPhoto,};
