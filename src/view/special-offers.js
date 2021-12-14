export const createSpecialOffers = (offer) => {
  const {
    type,
    price
  } = offer;
  return `<li class="event__offer">
    <span class="event__offer-title">${type}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`;
};

