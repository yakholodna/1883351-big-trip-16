import {createMenu} from './view/menu.js';
import {createFilteredMenu} from './view/filters.js';
import {createSortedMenu} from './view/sort.js';
import {createForm} from './view/create-form.js';
import {editForm} from './view/edit-form.js';

const pageBody = document.querySelector('.page-body');
pageBody.innerHTML = '';
const positions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
const renderElement = (container, template, location) => {
  container.insertAdjacentHTML(location, template);
};
renderElement(pageBody, createMenu(), positions.BEFOREEND);
renderElement(pageBody, createFilteredMenu(), positions.BEFOREEND);
renderElement(pageBody, createSortedMenu(), positions.BEFOREEND);
renderElement(pageBody, createForm(), positions.BEFOREEND);
renderElement(pageBody, editForm(), positions.AFTERBEGIN);
