import EditFormView from '../view/edit-form.js';
import EventView from '../view/events.js';
import {renderElement, RenderPosition} from '../render.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;

  constructor(container) {
    this.#eventContainer = container;
  }

  init = (event) => {
    this.#event = event;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EditFormView(event);

    this.#eventComponent.setEditClickHandler(this.#editClickHandler);
    this.#eventEditComponent.setEditFormSubmit(this.#editFormSubmit);

    renderElement(this.#eventContainer, this.#eventComponent.element, RenderPosition.BEFOREEND);
  }

  #replaceEventToForm = () => {
    this.#eventContainer.replaceChild(this.#eventEditComponent.element, this.#eventComponent.element);
  }

  #replaceFormToEvent = () => {
    this.#eventContainer.replaceChild(this.#eventComponent.element, this.#eventEditComponent.element);
  }

  #editClickHandler = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#eventEditComponent.setEditClickHandler(() => {
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  };

  #editFormSubmit = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
