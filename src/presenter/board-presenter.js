import { render, replace } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointsView from '../view/no-points-view.js';


export default class BoardPresenter {

  #container = null;
  #pointsModel = null;
  #sortsModel = null;
  #eventsListComponent = new EventsListView();

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

  #renderPoint(point, destinations, offers) {
    const destination = destinations.find((destinationItem) => destinationItem.id === point.destination);
    const offersForType = offers.find((offerItem) => offerItem.type === point.type).offers;
    const selectedOffers = offersForType.filter((offerItem) => point.offers.includes(offerItem.id));

    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const pointComponent = new TripPointView({
      point,
      destination,
      offers: selectedOffers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeydownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      destinations: destinations,
      offers: offers,
      onFormSubmit: () => {
        replaceFormToPoint();
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#eventsListComponent.element);
  }

  #renderBoard() {
    const points = [...this.#pointsModel.points];
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;
    const sorts = [...this.#sortsModel.sort];

    render(new TripSortView({sorts}), this.#container);
    render(this.#eventsListComponent, this.#container);

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], destinations, offers);
    }
  }
}
