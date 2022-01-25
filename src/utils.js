import {tripTypes, cityOptions, specialOffers, MAX_NUM_OF_OFFERS, cityDescriptions, cityDescriptionPhoto} from './constants.js';
import dayjs from 'dayjs';
import AbstractView from './view/abstract-view.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const getRandomTripType = () => {
  const randomIndex = getRandomInteger(0, tripTypes.length-1);
  return tripTypes[randomIndex];
};
export const getRandomCity = () => {
  const randomIndex = getRandomInteger(0, cityOptions.length-1);
  return cityOptions[randomIndex];
};
export const getRandomSpecialOffers = () => {
  const randomNumber = getRandomInteger(0, MAX_NUM_OF_OFFERS);
  const offers = [];
  for (let i = 0; i < randomNumber; i++) {
    const randomOffer = getRandomInteger(0, specialOffers.length-1);
    offers.push(specialOffers[randomOffer]);
  }
  return offers;
};
export const getRandomDescription = () => {
  const randomIndex = getRandomInteger(0, cityDescriptions.length-1);
  return cityDescriptions[randomIndex];
};
export const getRandomCityPic = () => {
  const randomIndex = getRandomInteger(0, 200);
  return `${cityDescriptionPhoto}${randomIndex}`;
};
export const isFavorite = () => Boolean(getRandomInteger(0,1));
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
export const generateRandomDate = () => dayjs(randomDate(new Date(2012, 0, 1), new Date()));

export const timeDiff = (start, end) => {
  start = start.split(':');
  end = end.split(':');
  const startDate = new Date(0, 0, 0, start[0], start[1], 0);
  const endDate = new Date(0, 0, 0, end[0], end[1], 0);
  // eslint-disable-next-line no-shadow
  let diff = endDate.getTime() - startDate.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);

  // If using time pickers with 24 hours format, add the below line get exact hours
  if (hours < 0) {hours = hours + 24;}

  return `${(hours <= 9 ? '0' : '') + hours  }H${  minutes <= 9 ? '0' : ''  }${minutes}M`;
};

export const getRandomPrice = () => getRandomInteger(0, 1000);

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
