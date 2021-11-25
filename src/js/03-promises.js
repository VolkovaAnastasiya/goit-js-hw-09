import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', onSubmitcreatePromises);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitcreatePromises(event) {
  event.preventDefault();
  let delay = Number(delayRef.value);
  const step = Number(stepRef.value);
  const amount = Number(amountRef.value);

  for (let i = 1; i <= amount; i += 1) {
    if (i !== 1) {
      delay += step;
    }
    createPromise(i, delay).then(fulfilled).catch(onReject).finally();
  }
}

function fulfilled({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
