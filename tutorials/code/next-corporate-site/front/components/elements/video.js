import PropTypes from "prop-types";
import { getStrapiMedia } from "utils/media";
import { mediaPropTypes } from "utils/types";

const Video = ({
  media,
  poster,
  className,
  controls = true,
  autoPlay = false,
}) => {
  const fullVideoUrl = getStrapiMedia(media.url);
  const fullPosterUrl = getStrapiMedia(poster?.url);

  return (
    <video
      className={className}
      poster={fullPosterUrl}
      controls={controls}
      autoPlay={autoPlay}
    >
      <source src={fullVideoUrl} type={media.mime} />
    </video>
  );
};

Video.propTypes = {
  media: mediaPropTypes.isRequired,
  poster: mediaPropTypes,
  className: PropTypes.string,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

export default Video;
