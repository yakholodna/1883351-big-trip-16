import {createElement} from '../render.js';

const createNoEvtTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEvents {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoEvtTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
