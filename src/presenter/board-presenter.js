import { SortType } from '../const.js';
import { sortPointDay, sortPointPrice } from '../utils.js';
import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';


export default class BoardPresenter {

  #container = null;
  #pointsModel = null;
  #sortsModel = null;
  #eventsListComponent = new EventsListView();

  #pointPresenters = new Map();

  #currentSortType = SortType.PRICE;

  constructor({container, pointModel, sortModel}) {
    this.#container = container;
    this.#pointsModel = pointModel;
    this.#sortsModel = sortModel;
  }

  init() {
    if (this.#pointsModel.points.length === 0) {
      render(new NoPointsView(), this.#container);
      return;
    }

    this.#renderSort();
    render(this.#eventsListComponent, this.#container);
    this.#renderBoard();
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#pointsModel.points.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#pointsModel.points.sort(sortPointPrice);
        break;
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderBoard();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(
      updatedPoint,
      this.#pointsModel.destinations,
      this.#pointsModel.offers
    );
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#eventsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    const sorts = [...this.#sortsModel.sort];

    render(new TripSortView({
      sorts,
      onSortTypeChange: this.#handleSortTypeChange
    }), this.#container);
  }

  #renderBoard() {
    const points = [...this.#pointsModel.points];
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;

    points.forEach((point) => this.#renderPoint(point, destinations, offers));
  }
}
