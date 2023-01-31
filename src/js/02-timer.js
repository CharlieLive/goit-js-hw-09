import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';
// import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const targetDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');
    if (targetDate < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', () => {
  const targetDate = new Date(document.querySelector('#datetime-picker').value);
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  startButton.setAttribute('disabled', 'disabled');

  const interval = setInterval(() => {
    const currentDate = new Date();
    const timeLeft = targetDate - currentDate;
    if (timeLeft <= 0) {
      clearInterval(interval);
      daysElement.innerText = '00';
      hoursElement.innerText = '00';
      minutesElement.innerText = '00';
      secondsElement.innerText = '00';
    } else {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      daysElement.innerText = String(days).padStart(2, '0');
      hoursElement.innerText = String(hours).padStart(2, '0');
      minutesElement.innerText = String(minutes).padStart(2, '0');
      secondsElement.innerText = String(seconds).padStart(2, '0');
    }
  }, 1000);
});