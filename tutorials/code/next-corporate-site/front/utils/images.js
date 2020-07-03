export function getStrapiMedia(url) {
  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  // Otherwise prepend the URL path with the Strapi URL
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
}
