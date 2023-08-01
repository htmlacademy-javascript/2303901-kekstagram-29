import './effects-photo.js';
import './validation-photo-description.js';
import './zoom-picture.js';

import './load-picture.js';
import {addSortToPhotos} from './photo-filters.js';
import {paintAllPhotos} from './thumbnail.js';

const postPicturesFromServer = (datesPictures) => {
  paintAllPhotos(datesPictures);
  addSortToPhotos(datesPictures);
};

export{postPicturesFromServer};
