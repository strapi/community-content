import Markdown from "react-markdown";
import { getStrapiImage } from "utils/images";
import ButtonLink from "./button-link";

const Hero = ({ data }) => {
  return (
    <div className="container flex flex-row items-center justify-between">
      {/* Left column for content */}
      <div className="flex-1 pr-8">
        {/* Hero section label */}
        <p className="uppercase tracking-wide font-semibold">{data.label}</p>
        {/* Big title */}
        <h1 className="text-5xl leading-snug mb-2">{data.title}</h1>
        {/* Description paragraph */}
        <p className="text-xl mb-6">{data.description}</p>
        {/* Buttons row */}
        <div className="flex flex-row gap-4">
          {data.buttons.map((button) => (
            <ButtonLink button={button} key={button.id} />
          ))}
        </div>
        {/* Small rich text */}
        <div className="text-sm mt-3">
          <Markdown source={data.smallTextWithLink} />
        </div>
      </div>
      {/* Right column for the image */}
      <img
        src={getStrapiImage(data.picture.url)}
        alt={data.picture.alternativeText}
        className="flex-shrink-0 object-contain w-6/12"
      />
    </div>
  );
};

export default Hero;
