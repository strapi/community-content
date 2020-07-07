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

export async function getStaticPaths() {
  const paths = [
    {
      params: { slug: [] },
    },
    {
      params: { slug: ["home"] },
    },
    {
      params: { slug: ["home", "page"] },
    },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Find the page data for the current slug
  let queryParams;
  if (params == {} || !params.slug) {
    // To get the homepage, find the only page where slug is null or empty string
    queryParams = `?slug=`;
  } else {
    // Otherwise find a page with a matching slug
    queryParams = `?slug=${params.slug[params.slug.length - 1]}`;
  }
  console.log(params, getStrapiURL(`/pages${queryParams}`));
  const pagesData = await (
    await fetch(getStrapiURL(`/pages${queryParams}`))
  ).json();
  console.log(pagesData);
  const { contentSections, metadata } = pagesData[0];

  return {
    props: {
      sections: contentSections,
      metadata,
    },
  };
}

export default DynamicPage;
