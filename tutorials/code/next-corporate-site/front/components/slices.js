import Hero from "@/components/hero";
import LargeVideo from "@/components/large-video";
import FeatureColumnsGroup from "@/components/feature-columns-group";
import FeatureRowsGroup from "@/components/feature-rows-group";
import BottomActions from "@/components/bottom-actions";

const Slices = ({ slices }) => {
  const showSlice = (slice) => {
    switch (slice.__component) {
      case "slices.hero":
        return <Hero data={slice} />;
      case "slices.large-video":
        return <LargeVideo data={slice} />;
      case "slices.feature-columns-group":
        return <FeatureColumnsGroup data={slice} />;
      case "slices.feature-rows-group":
        return <FeatureRowsGroup data={slice} />;
      case "slices.bottom-actions":
        return <BottomActions data={slice} />;
      default:
        return "unknown";
    }
  };

  return (
    <div className="flex flex-col gap-32">
      {slices.map((slice) => (
        <div key={`${slice.__component}${slice.id}`}>{showSlice(slice)}</div>
      ))}
    </div>
  );
};

export default Slices;
