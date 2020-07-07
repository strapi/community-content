import App from "next/app";
import Head from "next/head";
import "@/styles/index.css";
import { DefaultSeo } from "next-seo";
import { getStrapiMedia } from "utils/images";
import { getStrapiURL } from "utils/api";
import Layout from "@/components/layout";

const MyApp = ({ Component, pageProps }) => {
  // Extract the data we need
  const { global } = pageProps;
  const { metadata } = global;

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon.url)} />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${global.metaTitleSuffix}`}
        title={"Page"}
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(metadata.shareImage.formats).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            };
          }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />
      {/* Display the content */}
      <Layout global={global}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await (await fetch(getStrapiURL("/global"))).json();
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
