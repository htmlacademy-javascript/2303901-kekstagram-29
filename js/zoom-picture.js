const scaleValueInput = document.querySelector('.scale__control--value');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const CalculationValue = {
  UNITY: 100,
  SCALE: 0.25,
  START_SCALE: 1
};

const updateScale = (currentScale) => {
  const previewImage = document.querySelector('.img-upload__preview').querySelector('img');

  scaleValueInput.value = `${currentScale * CalculationValue.UNITY}%`;
  previewImage.style.transform = `scale(${currentScale})`;
};

scaleDownButton.addEventListener('click', () => {
  let currentScale = parseFloat(scaleValueInput.value) / CalculationValue.UNITY;

  if (currentScale > CalculationValue.SCALE) {
    currentScale -= CalculationValue.SCALE;
    updateScale(currentScale);
  }
});

scaleUpButton.addEventListener('click', () => {
  let currentScale = parseFloat(scaleValueInput.value) / CalculationValue.UNITY;

  if (currentScale < CalculationValue.START_SCALE) {
    currentScale += CalculationValue.SCALE;
    updateScale(currentScale);
  }
});
