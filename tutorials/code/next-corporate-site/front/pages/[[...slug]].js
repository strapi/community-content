import ErrorPage from "next/error";
import { getStrapiURL, getPageData } from "utils/api";
import Sections from "@/components/sections";
import Seo from "@/components/seo";
import { useRouter } from "next/dist/client/router";

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({ sections, metadata, preview }) => {
  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />;
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>;
  }
  return (
    <>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />
      {/* Display content sections */}
      <Sections sections={sections} preview={preview} />
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
  return { paths, fallback: true };
}

export async function getStaticProps({ params, preview = null }) {
  // Find the page data for the current slug
  let slug;
  if (params == {} || !params.slug) {
    // To get the homepage, find the only page where slug is an empty string
    slug = ``;
  } else {
    // Otherwise find a page with a matching slug
    slug = params.slug[params.slug.length - 1];
  }

  console.log("build", slug);

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData(slug, preview);

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata } = pageData;
  return {
    props: {
      preview,
      sections: contentSections,
      metadata,
    },
  };
}

export default DynamicPage;
