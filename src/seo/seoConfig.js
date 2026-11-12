const envSiteUrl = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_SITE_URL)
  ? process.env.REACT_APP_SITE_URL.replace(/\/$/, '')
  : null;

export const siteSeo = {
  siteName: "Masakali Indian Restobar",
  siteUrl: envSiteUrl || "https://masakalirestobar.ca",
  brandShort: "Masakali Restobar",
  defaultTitle: "Masakali Indian Restobar | Indian Restaurant in Ottawa (Byward Market)",
  defaultDescription: "Masakali Indian Restobar at 97 Clarence St., Ottawa. Modern Indian dining in the Byward Market — menu, reservations, and catering.",
  locale: "en_CA",
  ogLocale: "en_CA",
  htmlLang: 'en',
  cuisine: "Indian",
  priceRange: "$$",
  email: "infomasakaliottawa@gmail.com",
  servesCuisine: ["Indian"],
  areaServed: "Ottawa, Ontario",
  ogImage: '/logo192.png',
  openingHours: ['Mo-Su 11:30-22:00'],
  restaurants: [
  {
    name: "Masakali Indian Restobar",
    streetAddress: "97 Clarence St.",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    postalCode: "K1N 5P9",
    addressCountry: "CA",
    telephone: "+1-613-789-6777",
  }
  ],
};

export const pages = {
  home: {
    path: "/",
    title: "Masakali Indian Restobar | Ottawa Byward Market",
    description: "Masakali Indian Restobar on Clarence Street in Ottawa — modern Indian dining, menu, and reservations.",
  },
  about: {
    path: "/about",
    title: "About | Masakali Indian Restobar Ottawa",
    description: "Learn about Masakali Indian Restobar in Ottawa's Byward Market.",
  },
  menu: {
    path: "/menu",
    title: "Menu | Masakali Indian Restobar Ottawa",
    description: "Browse the Masakali Restobar menu — Indian classics and modern dishes in Ottawa.",
  },
  locations: {
    path: "/locations",
    title: "Location | Masakali Restobar Ottawa",
    description: "Visit Masakali Indian Restobar at 97 Clarence St., Ottawa, ON K1N 5P9.",
  },
  reservations: {
    path: "/reservations",
    title: "Reservations | Masakali Restobar Ottawa",
    description: "Book a table at Masakali Indian Restobar in Ottawa.",
  },
  catering: {
    path: "/catering",
    title: "Catering | Masakali Restobar Ottawa",
    description: "Indian catering from Masakali Restobar for Ottawa events and gatherings.",
  },
  cateringByTray: {
    path: "/catering-by-tray",
    title: "Catering by the Tray | Masakali Restobar",
    description: "Order catering trays from Masakali Indian Restobar in Ottawa.",
  },
  contact: {
    path: "/contact",
    title: "Contact | Masakali Restobar Ottawa",
    description: "Contact Masakali Restobar at (613) 789-6777. 97 Clarence St., Ottawa.",
  }
};

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('http') ? path : `${siteSeo.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  return normalized;
}

export function buildRestaurantJsonLd() {
  return siteSeo.restaurants.map((restaurant) => ({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${absoluteUrl('/')}#restaurant-${restaurant.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: restaurant.name,
    image: absoluteUrl(siteSeo.ogImage),
    url: absoluteUrl('/'),
    telephone: restaurant.telephone,
    email: siteSeo.email,
    servesCuisine: siteSeo.servesCuisine,
    priceRange: siteSeo.priceRange,
    menu: absoluteUrl('/menu'),
    acceptsReservations: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.streetAddress,
      addressLocality: restaurant.addressLocality,
      addressRegion: restaurant.addressRegion,
      postalCode: restaurant.postalCode,
      addressCountry: restaurant.addressCountry,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:30',
      closes: '22:00',
    },
    areaServed: siteSeo.areaServed,
  }));
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: siteSeo.siteName,
    url: absoluteUrl('/'),
    description: siteSeo.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: siteSeo.siteName,
      url: absoluteUrl('/'),
      logo: absoluteUrl(siteSeo.ogImage),
      email: siteSeo.email,
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: absoluteUrl('/reservations'),
      name: 'Reserve a table',
    },
  };
}

export function buildMenuItemJsonLd(item, path) {
  if (!item) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.description || undefined,
    url: absoluteUrl(path),
    image: item.image_url || item.imageUrl || undefined,
    offers: item.price != null && item.price !== '' ? {
      '@type': 'Offer',
      priceCurrency: "CAD",
      price: String(item.price),
      availability: 'https://schema.org/InStock',
    } : undefined,
  };
  return data;
}

export const siteFaqs = [["Where is Masakali Restobar located?", "Masakali Indian Restobar is at 97 Clarence St., Ottawa, ON K1N 5P9, in the Byward Market area."], ["What is the phone number?", "Call (613) 789-6777."], ["What are the hours?", "Open daily from 11:30 to 23:00. Please call to confirm holiday hours."], ["Do you offer catering?", "Yes. Catering and catering-by-the-tray options are available."]];

export function pageSeo(key, overrides = {}) {
  const page = pages[key] || {};
  return {
    title: overrides.title || page.title,
    description: overrides.description || page.description,
    path: overrides.path || page.path,
  };
}
