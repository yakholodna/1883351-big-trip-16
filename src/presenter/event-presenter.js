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

    this.#eventComponent = new EventView(event).element;
    this.#eventEditComponent = new EditFormView(event).element;

    this.#eventComponent.setEditClickHandler(this.#editClickHandler);
    this.#eventEditComponent.setEditFormSubmit(this.#editFormSubmit);

    renderElement(this.#eventContainer, this.#eventComponent, RenderPosition.BEFOREEND);
  }

  #replaceEventToForm = () => {
    this.#eventContainer.replaceChild(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToEvent = () => {
    this.#eventContainer.replaceChild(this.#eventComponent, this.#eventEditComponent);
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
