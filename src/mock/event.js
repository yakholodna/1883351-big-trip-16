import {getRandomTripType, getRandomCity, getRandomSpecialOffers} from '../utils.js';
export const generateEvent = () => ({
  city: getRandomCity(),
  tripType: getRandomTripType(),
  offers: getRandomSpecialOffers()
});
