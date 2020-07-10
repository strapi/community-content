// import { getStrapiMedia } from "@/utils/media";

import { getStrapiMedia } from "utils/media";

const Image = ({ media, className }) => {
  const { url, alternativeText } = media;
  const fullUrl = getStrapiMedia(url);
  return (
    <img src={fullUrl} alt={alternativeText || ""} className={className} />
  );
};

export default Image;
