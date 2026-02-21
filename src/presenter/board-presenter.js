import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointPresenter from './point-presenter.js';
import NoPointsView from '../view/no-points-view.js';


export default class BoardPresenter {

  #container = null;
  #pointsModel = null;
  #sortsModel = null;
  #eventsListComponent = new EventsListView();

  #pointPresenters = new Map();

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
    this.#renderBoard();
  }

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

  #renderBoard() {
    const points = [...this.#pointsModel.points];
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;
    const sorts = [...this.#sortsModel.sort];

    render(new TripSortView({sorts}), this.#container);
    render(this.#eventsListComponent, this.#container);

    points.forEach((point) => this.#renderPoint(point, destinations, offers));
  }
}
