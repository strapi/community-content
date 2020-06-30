import Head from "next/head";
import Hero from "@/components/hero";
import { getStrapiURL } from "utils/api";

export default function Index({ slices }) {
  return (
    <>
      {slices.map((slice) => {
        switch (slice.__component) {
          case "slices.hero":
            return <Hero data={slice} key={slice.id} />;
          default:
            return "unknown";
        }
      })}
    </>
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
