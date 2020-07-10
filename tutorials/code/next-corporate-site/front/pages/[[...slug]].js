import ErrorPage from "next/error";
import { getStrapiURL, getPageData } from "utils/api";
import Sections from "@/components/sections";
import Seo from "@/components/elements/seo";
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

export async function getStaticPaths() {
  // Get all pages from Strapi
  const pages = await (await fetch(getStrapiURL("/pages"))).json();
  const paths = pages.map((page) => {
    // Decompose the slug that was saved in Strapi
    const slugArray = page.slug.split("__");
    return {
      params: { slug: slugArray },
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params, preview = null }) {
  // Find the page data for the current slug
  let chainedSlugs;
  if (params == {} || !params.slug) {
    // To get the homepage, find the only page where slug is an empty string
    chainedSlugs = ``;
  } else {
    // Otherwise find a page with a matching slug
    // Recompose the slug that was saved in Strapi
    chainedSlugs = params.slug.join("__");
  }

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData(chainedSlugs, preview);

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
