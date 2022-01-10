import AbstractClass from './abstract-class';

const createNoEvtTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEvents extends AbstractClass {
  get template() {
    return createNoEvtTemplate();
  }
}
