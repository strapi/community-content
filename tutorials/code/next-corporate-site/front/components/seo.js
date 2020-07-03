import { NextSeo } from "next-seo";
import { getStrapiImage } from "utils/images";

const Seo = ({ metadata }) => {
  return (
    <NextSeo
      title={`${metadata.metaTitle} | Slack`}
      description={metadata.metaDescription}
      openGraph={{
        images: Object.values(metadata.shareImage.formats).map((image) => {
          return {
            url: getStrapiImage(image.url),
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
  );
};

export default Seo;
