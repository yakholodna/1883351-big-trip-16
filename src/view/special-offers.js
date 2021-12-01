export const createSpecialOffers = (offer) => (
  `<li class="event__offer">
    <span class="event__offer-title">${offer.type}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`
);

