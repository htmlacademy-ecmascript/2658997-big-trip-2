import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';
export default class FilterModel extends Observable {
  #filters = Object.values(FilterType);
  #activeFilter = FilterType.EVERYTHING;

  get filters() {
    return this.#filters;
  }

  get activeFilter() {
    return this.#activeFilter;
  }

  setFilter(updateType, filter) {
    this.#activeFilter = filter;
    this._notify(updateType, filter);
  }
}
