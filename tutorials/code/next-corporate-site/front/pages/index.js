import Head from "next/head";
import { getStrapiURL } from "utils/api";
import Stack from "@/components/stack";
import Layout from "@/components/layout";

export default function Index({ slices }) {
  return (
    <Layout>
      <Stack slices={slices} />
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
