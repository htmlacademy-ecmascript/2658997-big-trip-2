import Observable from '../framework/observable.js';
import { SortType } from '../const.js';

export default class SortModel extends Observable {
  #sorts = Object.values(SortType);
  #activeSort = SortType.PRICE;

  get sorts() {
    return this.#sorts;
  }

  get activeSort() {
    return this.#activeSort;
  }

  setSort(updateType, sort) {
    this.#activeSort = sort;
    this._notify(updateType, sort);
  }
}
