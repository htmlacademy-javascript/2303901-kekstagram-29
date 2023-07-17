const scaleValueInput = document.querySelector('.scale__control--value');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const СalculatioValue = {
  UNITY: 100,
  SCALE: 0.25,
  START_SCALE: 1
};

const updateScale = (currentScale) => {

  const previewImage = document.querySelector('.img-upload__preview');

  scaleValueInput.value = `${currentScale * СalculatioValue.UNITY}%`;
  previewImage.style.transform = `scale(${currentScale})`;
};

scaleDownButton.addEventListener('click', () => {

  let currentScale = parseFloat(scaleValueInput.value) / СalculatioValue.UNITY;

  if (currentScale > СalculatioValue.SCALE) {
    currentScale -= СalculatioValue.SCALE;
    updateScale(currentScale);
  }
});

scaleUpButton.addEventListener('click', () => {

  let currentScale = parseFloat(scaleValueInput.value) / СalculatioValue.UNITY;

  if (currentScale < СalculatioValue.START_SCALE) {
    currentScale += СalculatioValue.SCALE;
    updateScale(currentScale);
  }
});


