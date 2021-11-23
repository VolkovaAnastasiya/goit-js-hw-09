// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
//инициализация
const inputDateRef = document.querySelector('input#datetime-picker');
const btnDateStart = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const timerRef = document.querySelector('.timer');

let timerId = null;
btnDateStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date().getTime(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    let deltaTime = selectedDates[0].getTime() - options.defaultDate;

    if (deltaTime > 0) {
      btnDateStart.disabled = false;
    } else {
      clearInterval(timerId);
      btnDateStart.disabled = true;
      clearTimer();
      return alert('Please choose a date in the future');
    }

    const timer = {
      start() {
        btnDateStart.addEventListener('click', onBtnDateTimer);

        function onBtnDateTimer() {
          timerId = setInterval(() => {
            deltaTime -= 1000;
            const time = convertMs(deltaTime);
            updateClockFase(time);
            btnDateStart.disabled = true;
            btnDateStart.removeEventListener('click', onBtnDateTimer); // console.log(time);

            if (deltaTime <= 0) {
              clearInterval(timerId);
              clearTimer();
              return;
            }
          }, 1000);
        }
      },
    };
    timer.start();
  },
};
flatpickr(inputDateRef, options);

function updateClockFase(e) {
  daysRef.textContent = e.days;
  hoursRef.textContent = e.hours;
  minutesRef.textContent = e.minutes;
  secondsRef.textContent = e.seconds;
}

function clearTimer() {
  daysRef.textContent = '00';
  hoursRef.textContent = '00';
  minutesRef.textContent = '00';
  secondsRef.textContent = '00';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24; // Remaining days

  const days = addLeadingZero(Math.floor(ms / day)); // Remaining hours

  const hours = addLeadingZero(Math.floor((ms % day) / hour)); // Remaining minutes

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute)); // Remaining seconds

  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return {
    days,
    hours,
    minutes,
    seconds,
  };
} //-------------------------------------------------
// inputDateRef.addEventListener('change', onValidationDate);
// function onValidationDate() {
//   if (deltaTime > 0) {
//     btnDateStart.disabled = false;
//   } else {
//     clearInterval(timerId);
//     btnDateStart.disabled = true;
//     return alert('Please choose a date in the future');
//   }
// }
