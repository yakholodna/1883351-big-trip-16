import MenuView from '../view/menu.js';
import FilterView from '../view/filters.js';
import SortMenuView from '../view/sort.js';
import DestinationView from '../view/destination.js';
import NoEvents from '../view/no-events.js';
import {renderElement, RenderPosition} from '../render.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils.js';
import {SORT_TYPES} from '../constants.js';

export default class TripPresenter {
  #destinationContainer = null;
  #navigationContainer = null;
  #filterContainer = null;
  #tripContainer = null;
  #eventsContainer = null;

  #sortComponent = new SortMenuView();
  #filterComponent = new FilterView().element;
  #menuComponent = new MenuView().element;
  #destinationComponent = new DestinationView().element;
  #noEventComponent = new NoEvents().element;

  #listEvents = [];
  #eventPresenter = new Map();
  #currentSortType = SORT_TYPES.DAY;
  #isInitialRender = true;

  constructor(destinationContainer, tripContainer, filterContainer, navContainer, evtContainer) {
    this.#destinationContainer = destinationContainer;
    this.#tripContainer = tripContainer;
    this.#filterContainer = filterContainer;
    this.#navigationContainer = navContainer;
    this.#eventsContainer = evtContainer;
  }

  init = (events) => {
    this.#listEvents = [...events];

    this.#renderEvents();
  }

  #handleEventChange = (updatedEvent) => {
    this.#listEvents = updateItem(this.#listEvents, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((event) => {event.resetView();});
  }

  #sortEvents = (sortType) => {
    switch(sortType) {
      case SORT_TYPES.DAY:
        this.#sortByDate();
        break;
      case SORT_TYPES.TIME:
        this.#sortByTime();
        break;
      case SORT_TYPES.PRICE:
        this.#sortByPrice();
        break;
    }
    this.#currentSortType = sortType;
  }

  #handleSortChange = (sortType) => {
    if(this.#currentSortType === sortType && !this.#isInitialRender) {
      return;
    }
    this.#isInitialRender = false;
    this.#sortEvents(sortType);
    this.#clearAllEvents();
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
    renderElement(this.#tripContainer, this.#sortComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortChangeHandler(this.#handleSortChange);
  }

  #renderNoEvents = () => {
    renderElement(this.#tripContainer, this.#noEventComponent, RenderPosition.BEFOREEND);
  }

  #sortByDate = () => {
    this.#listEvents.sort((a,b)=> new Date(a.date) - new Date(b.date));
  }

  #sortByTime = () => {
    this.#listEvents.sort((a,b)=> {
      const timeA = (60 * Number(a.timeDiff.split('H')[0])) + (Number(a.timeDiff.split('H')[1].split('M')[0]));
      const timeB = (60 * Number(b.timeDiff.split('H')[0])) + (Number(b.timeDiff.split('H')[1].split('M')[0]));

      return timeB - timeA;
    });
  }

  #sortByPrice = () => {
    this.#listEvents.sort((a,b)=> b.price - a.price);
  }

  #renderEvent = (eventListElement, event) => {
    const eventPresenter = new EventPresenter(eventListElement, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #clearAllEvents = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
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
        this.#renderEvent(this.#eventsContainer, this.#listEvents[i]);
      }
      this.#handleSortChange(this.#currentSortType);
    }
  }
}
