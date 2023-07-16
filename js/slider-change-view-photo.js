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
    max: 125,
    step: 25
  }
};

const getElementStyle = () => {
  let targetValue = 'none'; // Declare a variable to store the target value

  // Get the 'min', 'max', and 'step' values for the selected filter from the dictionary
  let selectedFilterMin = filters[targetValue].min;
  let selectedFilterMax = filters[targetValue].max;
  let selectedFilterStep = filters[targetValue].step;
  let selectedStart = filters[targetValue].start;
  let selectedFilterValue = filters[targetValue].name;

  slider.classList.add('hidden');

  // Creating the slider with updated 'min', 'max', and 'step' values
  noUiSlider.create(slider, {
    start: selectedStart,
    step: selectedFilterStep,
    range: {
      'min': selectedFilterMin,
      'max': selectedFilterMax
    }
  });

  iconEffects.forEach((element) => {
    element.addEventListener('click', (evt) => {

      targetValue = evt.target.value; // Update the target value
      selectedFilterMin = filters[targetValue].min; // Update the 'min' value based on the new target value
      selectedFilterMax = filters[targetValue].max; // Update the 'max' value based on the new target value
      selectedFilterStep = filters[targetValue].step; // Update the 'step' value based on the new target value
      selectedStart = filters[targetValue].start;
      selectedFilterValue = filters[targetValue].name;

      // Update the slider with the new 'min', 'max', and 'step' values
      slider.noUiSlider.updateOptions({
        name: selectedFilterValue,
        start: selectedStart,
        step: selectedFilterStep,
        range: {
          'min': selectedFilterMin,
          'max': selectedFilterMax
        }
      });

      if (evt.target.value === 'none') {
        slider.classList.add('hidden');
        changeViewPicture.style.filter = 'none';
      } else {
        slider.classList.remove('hidden');
        const filterScaleValue = `${filters[targetValue].name}(${filters[targetValue].default}${filters[targetValue].unit})`;
        changeViewPicture.style.filter = filterScaleValue;

      }

    });
  });

  slider.noUiSlider.on('update', (values, handle) => {

    const filterScaleValue = `${filters[targetValue].name}(${values[handle]}${filters[targetValue].unit})`;
    changeViewPicture.style.filter = filterScaleValue;
    iconEffects.value = filters[targetValue].name;
    inputEffects.value = `${values[handle]}${filters[targetValue].unit}`;
  });

};

getElementStyle();


