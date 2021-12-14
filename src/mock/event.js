import {getRandomTripType, getRandomCity, getRandomSpecialOffers, isFavorite, generateRandomDate, timeDiff} from '../utils.js';

export const generateEvent = () => {
  const startDate = generateRandomDate();
  const endDate = generateRandomDate();
  //Всё додумала, вот только не могу разобраться как посчитать разницу
  //const hourDiff = endDate.diff(startDate, 'hour');
  //const minDiff = endDate.diff(startDate, 'minute');

  return {
    'city': getRandomCity(),
    'tripType': getRandomTripType(),
    'offers': getRandomSpecialOffers(),
    'date': generateRandomDate().format('MMM D'),
    'time': `${startDate.format('HH:MM')}`,
    'endTime': `${endDate.format('HH:MM')}`,
    'timeDiff': timeDiff(startDate.format('HH:MM'), endDate.format('HH:MM')),
    'favorite': isFavorite(),
  };
};
