import {onCloseBigPhoto} from './open-close-picture.js';
import {getElementStyle} from './slider-change-view-photo.js';
import {getPicturesFromServer} from './getting-posting-data.js';
import './form-create-picture.js';
import './change-zoom-picture.js';
import './photo-filters.js';
import './load-picture.js';

getPicturesFromServer();
getElementStyle();
onCloseBigPhoto();


