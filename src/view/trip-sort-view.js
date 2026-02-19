import AbstractView from '../framework/view/abstract-view';

function createSortTemplate (sort) {
  const isDisabled = ['event', 'offers'].includes(sort);
  const isActive = sort === 'price';

  return `
    <div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}"
             class="trip-sort__input  visually-hidden"
             type="radio"
             name="trip-sort"
             value="sort-${sort}"
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

  constructor({sorts}) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createTripSortTemplate(this.#sorts);
  }
}
