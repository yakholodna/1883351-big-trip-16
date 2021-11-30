import {createMenu} from './view/menu.js';
import {createFilterMenu} from './view/filters.js';
import {createSortMenu} from './view/sort.js';
import {createForm} from './view/create-form.js';
import {editForm} from './view/edit-form.js';
import {createMainTrip} from './view/destination.js';
import {createEvent} from './view/events.js';

const pageBody = document.querySelector('.page-body');
const filterContainer = document.querySelector('.trip-controls__filters');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const tripEvents = document.querySelector('.trip-events');
const tripDestination = document.querySelector('.trip-main');
const EVENT_COUNT = 3;
const positions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const renderElement = (container, template, location) => {
  container.insertAdjacentHTML(location, template);
};
renderElement(tripDestination, createMainTrip(), positions.AFTERBEGIN);
renderElement(navigationContainer, createMenu(), positions.BEFOREEND);
renderElement(filterContainer, createFilterMenu(), positions.BEFOREEND);
renderElement(tripEvents, createSortMenu(), positions.BEFOREEND);
renderElement(tripEvents, editForm(), positions.AFTERBEGIN);
for (let i = 0; i < EVENT_COUNT; i++) {
  renderElement(tripEvents, createEvent(), positions.BEFOREEND);
}
renderElement(pageBody, createForm(), positions.BEFOREEND);
