import {getRandomTripType, getRandomCity, getRandomSpecialOffers, getRandomCityPic, getRandomDescription, isFavorite, generateRandomDate} from '../utils.js';

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
    'description': getRandomDescription(),
    'date': generateRandomDate().format('MMM D'),
    'time': `${startDate.format('HH:MM')}`,
    'endTime': `${endDate.format('HH:MM')}`,
    'timeDiff': '0H 0M',
    'picture': getRandomCityPic,
    isFavorite,
  };
};
