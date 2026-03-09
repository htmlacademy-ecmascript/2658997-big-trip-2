import AbstractView from '../framework/view/abstract-view';
import { NoPointsMessage } from '../const.js';

function createNoPointsTemplate(filterType) {
  const noPointsMessage = NoPointsMessage[filterType];

  return `
    <p class="trip-events__msg">
      ${noPointsMessage}
    </p>
  `;
}

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
