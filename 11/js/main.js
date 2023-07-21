import {onShowBigPicture, onCloseBigPhoto} from './open-close-picture.js';
import './form-create-picture.js';
import {addPhotos} from './photo-generator.js';
import {paintAllPictures} from './thumbnail-rendering.js';
import './slider-change-view-photo.js';
import './change-zoom-picture.js';

const copyArrayPhoto = {
  copy: addPhotos()
};

paintAllPictures(copyArrayPhoto.copy);
onShowBigPicture(copyArrayPhoto);
onCloseBigPhoto();
