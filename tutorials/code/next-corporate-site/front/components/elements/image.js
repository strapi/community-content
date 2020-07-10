import { getStrapiMedia } from "utils/media";
import PropTypes from "prop-types";
import { mediaPropTypes } from "utils/types";

const Image = ({ media, className }) => {
  const { url, alternativeText } = media;
  const fullUrl = getStrapiMedia(url);

  return (
    <img src={fullUrl} alt={alternativeText || ""} className={className} />
  );
};

Image.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
};

export default Image;
