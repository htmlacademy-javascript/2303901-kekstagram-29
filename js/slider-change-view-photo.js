const slider = document.querySelector('.effect-level__slider');
const iconEffects = document.querySelectorAll('.effects__radio');
const inputEffects = document.querySelector('.effect-level__value');
const levelEffects = document.querySelector('.img-upload__effect-level ');
const previewImage = document.querySelector('.img-upload__preview').querySelector('img');

const filters = {
  chrome: {
    name: 'grayscale',
    default: '1',
    unit: '',
    start: 1,
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    name: 'sepia',
    default: '1',
    unit: '',
    start: 1,
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    name: 'invert',
    default: '100',
    unit: '%',
    start: 100,
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    name: 'blur',
    default: '3',
    unit: 'px',
    start: 3,
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    name: 'brightness',
    default: '3',
    unit: '',
    start: 3,
    min: 0,
    max: 3,
    step: 0.1
  },
  none: {
    start: 100,
    name: 'none',
    default: '100',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  }
};

const updateSlider = (value) => {

  const selectedFilter = filters[value];

  slider.noUiSlider.updateOptions({
    name: selectedFilter.name,
    start: selectedFilter.start,
    step: selectedFilter.step,
    range: {
      'min': selectedFilter.min,
      'max': selectedFilter.max
    }
  });
};

const updateFilterStyle = (value) => {
  const selectedFilter = filters[value];
  const filterScaleValue = `${selectedFilter.name}(${selectedFilter.default}${selectedFilter.unit})`;

  if (value === 'none') {
    levelEffects.classList.add('hidden');
    slider.classList.add('hidden');

    previewImage.style.filter = 'none';

  } else{

    previewImage.style.filter = filterScaleValue;
    levelEffects.classList.remove('hidden');
    slider.classList.remove('hidden');
  }
};

const getElementStyle = () => {

  let targetValue = 'none';

  levelEffects.classList.add('hidden');
  slider.classList.add('hidden');
  noUiSlider.create(slider, {
    start: filters[targetValue].start,
    step: filters[targetValue].step,
    range: {
      'min': filters[targetValue].min,
      'max': filters[targetValue].max
    }
  });

  iconEffects.forEach((element) => {

    element.addEventListener('click', (evt) => {

      targetValue = evt.target.value;
      updateSlider(targetValue);
      updateFilterStyle(targetValue);
    });
  });

  slider.noUiSlider.on('update', (values, handle) => {

    const selectedFilter = filters[targetValue];
    const filterScaleValue = `${selectedFilter.name}(${values[handle]}${selectedFilter.unit})`;

    previewImage.style.filter = filterScaleValue;
    iconEffects.value = selectedFilter.name;
    inputEffects.value = `${values[handle]}${selectedFilter.unit}`;
  });
};

getElementStyle();


