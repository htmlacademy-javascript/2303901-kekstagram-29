import {onShowBigPicture, onShowMoreComments, onCloseBigPhoto} from './open-close-picture.js';
import './form-create-picture.js';
import {addPhotos} from './photo-generator.js';
import {paintAllPictures} from './thumbnail-rendering.js';
import './slider-change-view-photo.js';

const copyArrayPhoto = {
  copy: addPhotos()
};

paintAllPictures(copyArrayPhoto.copy);
onShowBigPicture(copyArrayPhoto);
onShowMoreComments(copyArrayPhoto);
onCloseBigPhoto();
