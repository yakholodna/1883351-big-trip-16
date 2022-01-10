import {createElement} from '../render.js';

export default class AbstractClass {
  #element = null;
  _callback = {};
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Cant\'t instantiate AbstractClass, only concrete one');
    }
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }
}
