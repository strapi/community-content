import { getStrapiMedia } from "utils/images";

const FeatureColumnsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col lg:flex-row lg:flex-wrap gap-12 align-top">
      {data.features.map((feature) => (
        <div className="flex-1 text-lg" key={feature.id}>
          <img
            src={getStrapiMedia(feature.icon.url)}
            alt={feature.icon.alternativeText}
          />
          <h3 className="font-bold mt-6 mb-4">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureColumnsGroup;
