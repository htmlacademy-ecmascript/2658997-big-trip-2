const DESTINATION_COUNT_MAX_VISIBLE = 3;
const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const NoPointsMessage = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
};

const PointBlank = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const Duration = {
  HOUR: 1,
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

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  DESTINATION_COUNT_MAX_VISIBLE,
  PointBlank,
  Duration,
  TRIP_TYPES,
  NoPointsMessage,
  SortType,
  FilterType,
  UserAction,
  UpdateType,
  ApiMethod,
  ApiUrl,
  Mode,
};
