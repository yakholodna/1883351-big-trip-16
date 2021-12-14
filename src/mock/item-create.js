import {getRandomTripType, getRandomCity, getRandomDescription, getRandomCityPic} from '../utils.js';

export const itemCreate = () => ({
  'tripType': getRandomTripType(),
  'city': getRandomCity(),
  'description': getRandomDescription(),
  'picture': getRandomCityPic()
});
