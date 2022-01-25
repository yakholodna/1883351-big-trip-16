import {getRandomTripType, getRandomCity, getRandomPrice, getRandomSpecialOffers, isFavorite, generateRandomDate, timeDiff, getRandomDescription} from '../utils.js';
import {nanoid} from 'nanoid';
export const generateEvent = () => {
  const startDate = generateRandomDate();
  const endDate = generateRandomDate();
  return {
    'id': nanoid(),
    'city': getRandomCity(),
    'tripType': getRandomTripType(),
    'offers': getRandomSpecialOffers(),
    'date': generateRandomDate().format('MMM D'),
    'time': `${startDate.format('HH:MM')}`,
    'endTime': `${endDate.format('HH:MM')}`,
    'timeDiff': timeDiff(startDate.format('HH:MM'), endDate.format('HH:MM')),
    'favorite': isFavorite(),
    'description': getRandomDescription(),
    'price': getRandomPrice(),
  };
};
