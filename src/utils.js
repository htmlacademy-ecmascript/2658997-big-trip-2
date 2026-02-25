import dayjs from 'dayjs';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeTripDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {getRandomArrayElement, getRandomNumber, humanizeTripDueDate, sortPointDay, sortPointPrice};
