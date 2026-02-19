import {RenderPosition, render } from './framework/render.js';

import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import SortModel from './model/sort-model.js';


const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsElement = pageHeaderElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointModel();
const filtersModel = new FilterModel();
const sortsModel = new SortModel();

const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  pointModel: pointsModel,
  sortModel: sortsModel
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new TripFiltersView({
  filters: filtersModel.filters
}), tripControlsElement);

boardPresenter.init();
