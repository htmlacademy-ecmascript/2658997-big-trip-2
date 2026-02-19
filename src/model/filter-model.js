export default class FilterModel {
  #filters = ['everything', 'future', 'present', 'past'];
  #activeFilter;

  get filters() {
    return this.#filters;
  }
}
