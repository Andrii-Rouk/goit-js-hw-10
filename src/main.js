import { PREP_TIME } from './js/menu.js';

const orderLog = document.querySelector('.order-log');
const form = document.querySelector('.form');

function addOrderRow(drink) {
  const newItem = document.createElement('li');
  newItem.classList.add('row-pending');
  newItem.textContent = `⏳ ${drink} · у роботі...`;
  orderLog.append(newItem);
  return newItem;
}

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const drink = formData.get('drink');
  const state = formData.get('state');

  const delay = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';

  const row = addOrderRow(drink);

  makeOrder(delay, shouldResolve)
    .then(delay => {
      row.className = 'row-ok';
      row.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch(delay => {
      row.className = 'row-err';
      row.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      const time = new Date().toLocaleTimeString('uk-UA');
      row.textContent += ` · ${time}`;
    });
});
