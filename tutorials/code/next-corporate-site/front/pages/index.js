import Head from "next/head";
import { getStrapiURL } from "utils/api";
import Slices from "@/components/slices";
import Layout from "@/components/layout";

export default function Index({ slices }) {
  return (
    <Layout>
      <Slices slices={slices} />
    </Layout>
  );
}

export async function getStaticProps() {
  // Make an API call to Strapi
  const response = await fetch(getStrapiURL("/homepage"));
  // Process the response to get the data we need
  const homepageData = await response.json();
  const { slices } = homepageData;
  // Pass the data to our page via props
  return {
    props: {
      slices,
    },
  };
}
