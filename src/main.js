import {RenderPosition, render } from './framework/render.js';

import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import SortModel from './model/sort-model.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';


const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripControlsElement = pageHeaderElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const newPointButtonElement = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointModel();
const filtersModel = new FilterModel();
const sortsModel = new SortModel();

const handleNewPointFormClose = () => {
  newPointButtonElement.disabled = false;
};

const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  pointModel: pointsModel,
  sortModel: sortsModel,
  filterModel: filtersModel,
  onNewPointDestroy: handleNewPointFormClose
});

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint();
  newPointButtonElement.disabled = true;
};

newPointButtonElement.addEventListener('click', handleNewPointButtonClick);

const filterPresenter = new FilterPresenter({
  container: tripControlsElement,
  filterModel: filtersModel,
  pointModel: pointsModel
});


render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();
