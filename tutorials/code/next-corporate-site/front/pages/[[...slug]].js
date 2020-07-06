import Head from "next/head";
import { getStrapiURL } from "utils/api";
import Sections from "@/components/sections";
import Layout from "@/components/layout";
import Seo from "@/components/seo";

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

export default DynamicPage;

// Create one page per Strapi document
export async function getStaticPaths() {
  const pagesData = await (await fetch(getStrapiURL("/pages"))).json();
  // console.log(pagesData);
  const paths = pagesData.map((page) => {
    // if (page.slug == null) {
    //   return { params: { slug: [] } };
    // }
    return { params: { slug: [page.slug] } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch global and page-specific data from Strapi
  console.log("PARAMS", { params });
  const pageData = await (
    await fetch(getStrapiURL(`/pages?slug=${params.slug}`))
  ).json();
  const globalData = await (await fetch(getStrapiURL("/global"))).json();
  // Process the response to get the data we need
  const { metadata, contentSections } = pageData[0];
  // Pass the data to our page via props
  return {
    props: {
      metadata,
      sections: contentSections,
    },
  };
}
