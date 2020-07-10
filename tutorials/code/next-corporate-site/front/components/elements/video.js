import { getStrapiMedia } from "utils/media";

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

export default Video;
