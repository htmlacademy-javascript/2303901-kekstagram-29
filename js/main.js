import {onCloseBigPhoto} from './open-close-picture.js';
import {getElementStyle} from './effects-photo.js';
import {getPicturesFromServer} from './working-with-server.js';
import './photo-description-validation.js';
import './zoom-picture.js';
import './photo-filters.js';
import './load-picture.js';

getPicturesFromServer();
getElementStyle();
onCloseBigPhoto();


