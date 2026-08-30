export const SITE_KEY = 'restobar';

export const SITE_LOCATION_SLUGS = {
  california: ['california'],
  montreal: ['montreal'],
  rangde: ['rangde'],
  restobar: ['restobar'],
  ottawa: ['stittsville', 'wellington'],
};

export function filterCurrentSiteLocations(locations = []) {
  const allowedSlugs = SITE_LOCATION_SLUGS[SITE_KEY] || [];
  return locations.filter((location) => (
    allowedSlugs.includes(String(location.slug || location.location_slug || '').toLowerCase())
  ));
}
