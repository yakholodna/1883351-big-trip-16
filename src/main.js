import {EVENT_COUNT} from './constants.js';
import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import SortMenuView from './view/sort.js';
import DestinationView from './view/destination.js';
import CreateFormView from './view/create-form.js';
import EditFormView from './view/edit-form.js';
import EventView from './view/events.js';
import {generateEvent} from './mock/event.js';
import {itemCreate} from './mock/item-create.js';
import {renderElement, RenderPosition} from './render.js';
import NoEvents from './view/no-events.js';

const pageBody = document.querySelector('.page-body');
const filterContainer = document.querySelector('.trip-controls__filters');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const tripEvents = document.querySelector('.trip-events');
const tripDestination = document.querySelector('.trip-main');

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EditFormView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.element, eventComponent.element);
  };
  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
    eventEditComponent.setEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  });

  eventEditComponent.setEditFormSubmit(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(eventListElement, eventComponent.element, RenderPosition.BEFOREEND);
};

const allEvents = [];
for (let i = 0; i < EVENT_COUNT; i++) {
  allEvents.push(generateEvent());
}

renderElement(navigationContainer, new MenuView().element, RenderPosition.BEFOREEND);
renderElement(filterContainer, new FilterView().element, RenderPosition.BEFOREEND);

if (allEvents.length === 0) {
  renderElement(tripEvents, new NoEvents().element, RenderPosition.BEFOREEND);
}
else {
  renderElement(tripDestination, new DestinationView().element, RenderPosition.AFTERBEGIN);
  renderElement(tripEvents, new SortMenuView().element, RenderPosition.BEFOREEND);
  for (let i = 0; i < allEvents.length; i++) {
    renderEvent(tripEvents, allEvents[i]);
  }
  renderElement(pageBody, new CreateFormView(itemCreate()).element, RenderPosition.BEFOREEND);
}
