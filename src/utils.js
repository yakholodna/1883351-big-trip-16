import {tripTypes, cityOptions, specialOffers, MAX_NUM_OF_OFFERS, cityDescriptions, cityDescriptionPhoto} from './constants.js';

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


