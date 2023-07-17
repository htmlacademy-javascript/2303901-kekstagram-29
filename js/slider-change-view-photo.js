const slider = document.querySelector('.img-upload__effect-level');
const changeViewPicture = document.querySelector('.img-upload__preview');
const iconEffects = document.querySelectorAll('.effects__radio');
const inputEffects = document.querySelector('.effect-level__value');
const filters = {
  chrome: {
    name: 'grayscale',
    default: '0.5',
    unit: '',
    start: 0.5,
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    name: 'sepia',
    default: '0.5',
    unit: '',
    start: 0.5,
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    name: 'invert',
    default: '50',
    unit: '%',
    start: 50,
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    name: 'blur',
    default: '1.5',
    unit: 'px',
    start: 1.5,
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    name: 'brightness',
    default: '1.5',
    unit: '',
    start: 1.5,
    min: 0,
    max: 3,
    step: 0.1
  },
  none: {
    start: 0,
    name: 'none',
    default: '',
    unit: '',
    min: 0,
    max: 0,
    step: 0
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
  if (value === 'none') {
    slider.classList.add('hidden');
    changeViewPicture.style.filter = 'none';
  } else {
    slider.classList.remove('hidden');
    const selectedFilter = filters[value];
    const filterScaleValue = `${selectedFilter.name}(${selectedFilter.default}${selectedFilter.unit})`;
    changeViewPicture.style.filter = filterScaleValue;
  }
};

const getElementStyle = () => {
  let targetValue = 'none';

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
    changeViewPicture.style.filter = filterScaleValue;
    iconEffects.value = selectedFilter.name;
    inputEffects.value = `${values[handle]}${selectedFilter.unit}`;
  });
};

getElementStyle();


