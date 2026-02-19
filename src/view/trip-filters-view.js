import AbstractView from '../framework/view/abstract-view';

function createFilterTemplate(filter) {
  const isActive = filter === 'everything';

  return `
     <div class="trip-filters__filter">
        <input id="filter-${filter}"
               class="trip-filters__filter-input  visually-hidden"
               type="radio"
               name="trip-filter"
               value="${filter}"
               ${isActive ? 'checked' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
      </div>
  `;
}

function createTripFilterTemplate(filters) {
  const filterTemplate = filters
    .map((filterItem) => createFilterTemplate(filterItem))
    .join('');
  return `
    <form class="trip-filters" action="#" method="get">
      ${filterTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class TripFilterView extends AbstractView {
  #filters = [];

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFilterTemplate(this.#filters);
  }
}
