import {getRandomTripType, getRandomCity, getRandomSpecialOffers, getRandomCityPic, getRandomDescription, isFavorite} from '../utils.js';
export const generateEvent = () => ({
  city: getRandomCity(),
  tripType: getRandomTripType(),
  offers: getRandomSpecialOffers(),
  description: getRandomDescription(),
  picture: getRandomCityPic,
  isFavorite,
});
