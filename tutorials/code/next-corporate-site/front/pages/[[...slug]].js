import { getStrapiURL } from "utils/api";
import Layout from "@/components/layout";
import Sections from "@/components/sections";

const DynamicPage = ({ sections, metadata }) => {
  return (
    <>
      {/* Add meta tags for SEO*/}
      {/* <Seo metadata={metadata} /> */}
      <Layout>
        {/* Display content sections */}
        <Sections sections={sections} />
      </Layout>
    </>
  );
};

// List the slugs of a page's parents
function getPagePath(page, slugs) {
  // Add current page slug to the list
  const newSlugs = [page.slug, ...slugs];
  // Check if page has a parent
  if (page.parentPage) {
    // Check if this parent has a parent via recursion
    return getPagePath(page.parentPage, newSlugs);
  }
  // Return the list of slugs as path
  return newSlugs;
}

export async function getStaticPaths() {
  // Get all pages from Strapi
  const pages = await (await fetch(getStrapiURL("/pages"))).json();
  const paths = pages.map((page) => {
    const slugs = getPagePath(page, []);
    return {
      params: { slug: slugs },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Find the page data for the current slug
  let queryParams;
  if (params == {} || !params.slug) {
    // To get the homepage, find the only page where slug is an empty string
    queryParams = `?slug=`;
  } else {
    // Otherwise find a page with a matching slug
    queryParams = `?slug=${params.slug[params.slug.length - 1]}`;
  }
  const pagesData = await (
    await fetch(getStrapiURL(`/pages${queryParams}`))
  ).json();
  const { contentSections, metadata } = pagesData[0];

  return {
    props: {
      sections: contentSections,
      metadata,
    },
  };
}

export default DynamicPage;
