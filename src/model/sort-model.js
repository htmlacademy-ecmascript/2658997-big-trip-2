export default class SortModel {
  #sorts = ['day', 'event', 'time', 'price', 'offers'];
  #activeSort = 'price';

  get sort() {
    return this.#sorts;
  }
}
