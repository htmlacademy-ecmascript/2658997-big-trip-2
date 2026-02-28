import { mockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {

  #pointsData = mockPoints;
  #destinationsData = mockDestinations;
  #offersData = mockOffers;

  get points() {
    return this.#pointsData;
  }

  get destinations() {
    return this.#destinationsData;
  }

  get offers() {
    return this.#offersData;
  }

  updatePoint(updateType, update) {
    const index = this.#pointsData.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#pointsData = [
      ...this.#pointsData.slice(0, index),
      update,
      ...this.#pointsData.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#pointsData = [
      update,
      ...this.#pointsData,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#pointsData.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#pointsData = [
      ...this.#pointsData.slice(0, index),
      ...this.#pointsData.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
