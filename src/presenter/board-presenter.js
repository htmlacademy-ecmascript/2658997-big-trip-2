import { SortType, FilterType, UpdateType, UserAction } from '../const.js';
import { sortPointDay, sortPointPrice, filter } from '../utils.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';


export default class BoardPresenter {

  #container = null;
  #pointsModel = null;
  #sortsModel = null;
  #filterModel = null;
  #eventsListComponent = new EventsListView();

  #sortComponent = null;
  #noPointsComponent = null;

  #pointPresenters = new Map();

  #newPointPresenter = null;

  constructor({container, pointModel, sortModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointsModel = pointModel;
    this.#sortsModel = sortModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#sortsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.activeFilter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    const activeSort = this.#sortsModel.activeSort;

    switch (activeSort) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);

      default:
        return filteredPoints.sort(sortPointPrice);
    }
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#sortsModel.setSort(UpdateType.MAJOR, SortType.DAY);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.#pointsModel.destinations, this.#pointsModel.offers);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#sortsModel.activeSort === sortType) {
      return;
    }

    this.#sortsModel.setSort(UpdateType.MINOR, sortType);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        const presenter = this.#pointPresenters.get(data?.id);
        if (presenter) {
          presenter.init(
            data,
            this.#pointsModel.destinations,
            this.#pointsModel.offers
          );
        }
        break;
      }
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      listContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#sortsModel.setSort(UpdateType.PATCH, SortType.PRICE);
    }
  }

  #renderSort() {
    this.#sortComponent = new TripSortView({
      sorts: this.#sortsModel.sorts,
      currentSortType: this.#sortsModel.activeSort,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#eventsListComponent, this.#container);

    points.forEach((point) => {
      this.#renderPoint(point, this.#pointsModel.destinations, this.#pointsModel.offers);
    });
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterModel.activeFilter
    });

    render(this.#noPointsComponent, this.#container);
  }

}
