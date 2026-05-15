import type { CollectionEntry } from 'astro:content';

export type CarData = CollectionEntry<'cars'>['data'];

/** "£189,000" */
export function formatPrice(price: number): string {
  return '£' + price.toLocaleString('en-GB');
}

/** "Inc. VAT" / "+ VAT" / "" */
export function priceQualifierLabel(q: CarData['priceQualifier']): string {
  if (q === 'inc-vat') return 'Inc. VAT';
  if (q === 'plus-vat') return '+ VAT';
  return '';
}

/** "20 miles" */
export function formatMileage(miles: number): string {
  return miles.toLocaleString('en-GB') + (miles === 1 ? ' mile' : ' miles');
}

/** "Audi RS6" */
export function carTitle(car: CarData): string {
  return `${car.make} ${car.model}`;
}

/** "Audi RS6 GT 4.0 TFSI V8 Tiptronic Quattro" */
export function carFullTitle(car: CarData): string {
  return `${car.make} ${car.model} ${car.variant}`;
}

/** Human label for availability status. */
export function statusLabel(status: CarData['status']): string {
  switch (status) {
    case 'sourcing':
      return 'Available to source';
    case 'reserved':
      return 'Reserved';
    case 'sold':
      return 'Now sold';
    default:
      return 'In stock';
  }
}

/** Sort newest/most expensive first, sold cars last. */
export function sortCars(
  cars: CollectionEntry<'cars'>[],
): CollectionEntry<'cars'>[] {
  const rank = (s: CarData['status']) => (s === 'sold' ? 1 : 0);
  return [...cars].sort((a, b) => {
    const r = rank(a.data.status) - rank(b.data.status);
    if (r !== 0) return r;
    return b.data.price - a.data.price;
  });
}
