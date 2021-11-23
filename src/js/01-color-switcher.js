//инициализация
const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
const bodyRef = document.body;

// слушатели событий на кнопки

btnStartRef.addEventListener('click', onClickStart);
btnStopRef.addEventListener('click', onClickStop);

// ф-ция вешает инлайн стиль backGround на body

function bgColorChench() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

// ф-ция onClickStart  при клике на кноку  запускает setInterval

function onClickStart() {
  //если кнопа была нажата отключаем ее
  if (onClickStart) {
    btnStartRef.disabled = true;
    btnStopRef.disabled = false;
  }

  timerId = setInterval(bgColorChench, 1000);
}

// ф-ция onClickStop  при клике на кноку удаляет setInterval

function onClickStop() {
  if (onClickStop) {
    btnStartRef.disabled = false;
    btnStopRef.disabled = true;
  }

  clearInterval(timerId);
} // ф-ция  генерации случайного цвета

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
