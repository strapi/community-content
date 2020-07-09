export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export async function getPageData(slug, preview = false) {
  // Find the pages that match this slug
  const pagesData = await (
    await fetch(
      getStrapiURL(
        `/pages?slug=${slug}&status=published${preview ? "&status=draft" : ""}`
      )
    )
  ).json();
  // Make sure we found something, otherwise return null
  if (pagesData == null || pagesData.length === 0) {
    return null;
  }
  // Return the first item since there should only be one result per slug
  return pagesData[0];
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData() {
  const global = await (await fetch(getStrapiURL("/global"))).json();
  return global;
}
