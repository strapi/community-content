import "@/styles/index.css";
import { DefaultSeo } from "next-seo";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      {/* Global site metadata */}
      {/* <DefaultSeo /> */}
      {/* Display the content */}
      <Component {...pageProps} />
    </>
  );
};

// export async function getInitialProps() {
//   // Make an API call to Strapi
//   const response = await fetch(getStrapiURL("/global"));
//   // Process the response to get the data we need
//   const global = await response.json();
//   console.log(global);
//   // Pass the data to our page via props
//   return {
//     props: {},
//   };
// }

export default MyApp;
