import TripInfoView from './view/trip-info-view';
import TripFilterView from './view/trip-filter-view.js';
import { render } from './render.js';

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsElement = pageHeaderElement.querySelector('.trip-controls__filters');

render(new TripInfoView(), tripMainElement);
render(new TripFilterView(), tripControlsElement);
