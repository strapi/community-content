import classNames from "classnames";
import { getStrapiImage } from "utils/images";

const FeatureRowsGroup = ({ data }) => {
  // Handle the media differently depending on its type
  const showMedia = (media) => {
    switch (media.mime) {
      case "video/mp4":
        return (
          <video className="w-full h-auto" autoPlay loop>
            <source src={getStrapiImage(media.url)} type={media.mime} />
          </video>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container flex flex-col gap-12">
      {data.features.map((feature, index) => (
        <div
          className={classNames(
            // Common classes
            "flex flex-col justify-start md:justify-between md:items-center gap-10",
            {
              "lg:flex-row": index % 2 === 0,
              "lg:flex-row-reverse": index % 2 === 1,
            }
          )}
          key={feature.id}
        >
          {/* Text section */}
          <div className="w-full lg:w-6/12 lg:pr-6 text-lg">
            <h3 className="title">{feature.title}</h3>
            <p className="my-6">{feature.description}</p>
            <a
              className="text-blue-600 with-arrow hover:underline"
              href={feature.link.href}
            >
              {feature.link.text}
            </a>
          </div>
          {/* Media section */}
          <div className="w-full sm:9/12 lg:w-6/12 max-h-full">
            {showMedia(feature.media)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureRowsGroup;
