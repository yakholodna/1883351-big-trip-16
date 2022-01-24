import {EVENT_COUNT} from './constants.js';
import CreateFormView from './view/create-form.js';
import {generateEvent} from './mock/event.js';
import {itemCreate} from './mock/item-create.js';
import TripPresenter from './presenter/trip-presenter.js';
import {renderElement, RenderPosition} from './render.js';


//All locations where components will go
const pageBody = document.querySelector('.page-body');
const filterContainer = document.querySelector('.trip-controls__filters');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const tripEvents = document.querySelector('.trip-events');
const tripDestination = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events__list');

const allEvents = [];
for (let i = 0; i < EVENT_COUNT; i++) {
  allEvents.push(generateEvent());
}

const trip = new TripPresenter(tripDestination, tripEvents, filterContainer, navigationContainer, eventsContainer);
trip.init(allEvents);

if(allEvents.length !== 0) {
  renderElement(pageBody, new CreateFormView(itemCreate()).element, RenderPosition.BEFOREEND);
}
