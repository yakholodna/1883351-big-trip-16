import MenuView from '../view/menu.js';
import FilterView from '../view/filters.js';
import SortMenuView from '../view/sort.js';
import DestinationView from '../view/destination.js';
import NoEvents from '../view/no-events.js';
import {renderElement, RenderPosition} from '../render.js';
import EventPresenter from './event-presenter.js';

export default class TripPresenter {
  #destinationContainer = null;
  #navigationContainer = null;
  #filterContainer = null;
  #tripContainer = null;

  #sortComponent = new SortMenuView().element;
  #filterComponent = new FilterView().element;
  #menuComponent = new MenuView().element;
  #destinationComponent = new DestinationView().element;
  #noEventComponent = new NoEvents().element;

  #listEvents = [];

  constructor(destinationContainer, tripContainer, filterContainer, navContainer) {
    this.#destinationContainer = destinationContainer;
    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#navigationContainer = navContainer;
  }

  init = (events) => {
    this.#listEvents = [...events];

    this.#renderEvents();
  }

  #renderDestination = () => {
    renderElement(this.#destinationContainer, this.#destinationComponent, RenderPosition.AFTERBEGIN);
  }

  #renderMenu = () => {
    renderElement(this.#navigationContainer, this.#menuComponent, RenderPosition.BEFOREEND);
  }

  #renderFilters = () => {
    renderElement(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    renderElement(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderNoEvents = () => {
    renderElement(this.#tripContainer, this.#noEventComponent, RenderPosition.BEFOREEND);
  }

  #renderEvent = (eventListElement, event) => {
    const eventPresenter = new EventPresenter(eventListElement);
    eventPresenter.init(event);
  }

  #renderEvents = () => {
    this.#renderMenu();
    this.#renderFilters();

    if(this.#listEvents.length === 0) {
      this.#renderNoEvents();
    }
    else {
      this.#renderDestination();
      this.#renderSort();
      for (let i = 0; i < this.#listEvents.length; i++) {
        this.#renderEvent(this.#tripContainer, this.#listEvents[i]);
      }
    }
  }
}
