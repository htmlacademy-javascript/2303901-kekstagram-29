const MINUTE_IN_HOUR = 60;

//Функция перевода в минуты
const getMinutes = (time) => {
  const getArray = time.split(':');
  const getArrayNumbers = getArray.map((value) => Number(value));
  const changeToMinutes = getArrayNumbers[0] * MINUTE_IN_HOUR + getArrayNumbers[1];

  return changeToMinutes ;
};

//функция проверки времени
const checkTime = (start, end, meet, time) => {
  const startWork = getMinutes(start);
  const endWork = getMinutes(end);
  const startMeet = getMinutes(meet);

  if(endWork - startWork >= time && endWork - startMeet >= time && meet >= start){
    return true;
  }else{
    return false;
  }

};

checkTime('08:00', '17:30', '14:00', 90);
checkTime('8:0', '10:0', '8:0', 120);
checkTime('08:00', '14:30', '14:00', 90);
checkTime('14:00', '17:30', '08:0', 90);
checkTime('8:00', '17:30', '08:00', 900);
