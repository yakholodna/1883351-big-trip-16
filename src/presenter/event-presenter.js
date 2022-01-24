import EditFormView from '../view/edit-form.js';
import EventView from '../view/events.js';
import {renderElement, RenderPosition} from '../render.js';
import {remove} from '../utils.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT'
};
export default class EventPresenter {
  #eventContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #changeData = null;
  #changeMode = null;

  #event = null;
  #mode = MODE.DEFAULT;

  constructor(container, changeData, changeMode) {
    this.#eventContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event) => {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(event);
    this.#eventEditComponent = new EditFormView(event);

    this.#eventComponent.setEditClickHandler(this.#editClickHandler);
    this.#eventComponent.setFavButtonHandler(this.#handleFavCLick);
    this.#eventEditComponent.setEditFormSubmit(this.#editFormSubmit);

    //Handles the renewal of an event when there's a change -------------------------------------------->
    if(prevEventComponent === null || prevEventEditComponent === null) {
      renderElement(this.#eventContainer, this.#eventComponent.element, RenderPosition.BEFOREEND);
      return;
    }

    if(this.#mode === MODE.DEFAULT) {
      this.#eventContainer.replaceChild(this.#eventComponent.element, prevEventComponent.element);
    }

    if(this.#mode === MODE.EDIT) {
      this.#eventContainer.replaceChild(this.#eventEditComponent.element, prevEventEditComponent.element);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
    //----------------------------------------------------------------------------------------------------->
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView = () => {
    if(this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  #handleFavCLick = () => {
    this.#changeData({...this.#event, favorite: !this.#event.favorite});
  }

  #replaceEventToForm = () => {
    this.#eventContainer.replaceChild(this.#eventEditComponent.element, this.#eventComponent.element);
    this.#changeMode();
    this.#mode = MODE.EDIT;
  }

  #replaceFormToEvent = () => {
    this.#eventContainer.replaceChild(this.#eventComponent.element, this.#eventEditComponent.element);
    this.#mode = MODE.DEFAULT;
  }

  #editClickHandler = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#eventEditComponent.setEditClickHandler(() => {
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  };

  #editFormSubmit = (event) => {
    this.#changeData(event);
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
