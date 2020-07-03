import Head from "next/head";
import { getStrapiURL } from "utils/api";
import Slices from "@/components/slices";
import Layout from "@/components/layout";
import Seo from "@/components/seo";

export default function Index({ slices, metadata }) {
  return (
    <>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />
      <Layout>
        {/* Display content slices */}
        <Slices slices={slices} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // Make an API call to Strapi
  const response = await fetch(getStrapiURL("/homepage"));
  // Process the response to get the data we need
  const homepageData = await response.json();
  const { slices, metadata } = homepageData;
  // Pass the data to our page via props
  return {
    props: {
      slices,
      metadata,
    },
  };
}
