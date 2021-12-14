import {createMenu} from './view/menu.js';
import {createFilterMenu} from './view/filters.js';
import {createSortMenu} from './view/sort.js';
import {createForm} from './view/create-form.js';
import {editForm} from './view/edit-form.js';
import {createMainTrip} from './view/destination.js';
import {createEvent} from './view/events.js';
import {EVENT_COUNT, positions} from './constants.js';
import {generateEvent} from './mock/event.js';
import {createEditForm} from './mock/item-edit.js';
import {itemCreate} from './mock/item-create.js';

const pageBody = document.querySelector('.page-body');
const filterContainer = document.querySelector('.trip-controls__filters');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const tripEvents = document.querySelector('.trip-events');
const tripDestination = document.querySelector('.trip-main');

const renderElement = (container, template, location) => {
  container.insertAdjacentHTML(location, template);
};

const allEvents = [];
for (let i = 0; i < EVENT_COUNT; i++) {
  allEvents.push(generateEvent());
}
renderElement(tripDestination, createMainTrip(), positions.AFTERBEGIN);
renderElement(navigationContainer, createMenu(), positions.BEFOREEND);
renderElement(filterContainer, createFilterMenu(), positions.BEFOREEND);
renderElement(tripEvents, createSortMenu(), positions.BEFOREEND);
renderElement(tripEvents, editForm(createEditForm()), positions.BEFOREEND);
for (let i = 0; i < allEvents.length; i++) {
  renderElement(tripEvents, createEvent(allEvents[i]), positions.BEFOREEND);
}
renderElement(pageBody, createForm(itemCreate()), positions.BEFOREEND);
