export function getStrapiImage(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}
