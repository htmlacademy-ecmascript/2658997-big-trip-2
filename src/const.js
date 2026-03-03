const POINTS_COUNT = 3;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const NO_POINTS_MESSAGES = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UserAction = {
  UPDATE_POINT: 'update-point',
  ADD_POINT: 'add-point',
  DELETE_POINT: 'delete-point',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};

const ApiMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const ApiUrl = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export {
  DESCRIPTIONS,
  POINTS_COUNT,
  TRIP_TYPES,
  NO_POINTS_MESSAGES,
  SortType,
  FilterType,
  UserAction,
  UpdateType,
  ApiMethod,
  ApiUrl,
};
