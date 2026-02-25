import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const.js';

function createSortTemplate (sort) {
  const isDisabled = [SortType.EVENT, SortType.OFFERS].includes(sort);
  const isActive = sort === SortType.PRICE;

  return `
    <div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}"
             class="trip-sort__input  visually-hidden"
             type="radio"
             name="trip-sort"
             value="sort-${sort}"
             data-sort-type="${sort}"
             ${isActive ? 'checked' : ''}
             ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
    </div>
  `;
}

function createTripSortTemplate(sorts) {
  const sortTemplate = sorts
    .map((sortItem) => createSortTemplate(sortItem))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortTemplate}
          </form>`;
}

export default class TripSortView extends AbstractView {
  #sorts = [];
  #handleSortTypeChange = null;

  constructor({sorts, onSortTypeChange}) {
    super();
    this.#sorts = sorts;

    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createTripSortTemplate(this.#sorts);
  }
}
