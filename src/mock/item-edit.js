import {getRandomDescription, getRandomTripType, getRandomCity} from '../utils.js';

export const createEditForm = () => ({
  'city': getRandomCity(),
  'description': getRandomDescription(),
  'tripType': getRandomTripType()
});
