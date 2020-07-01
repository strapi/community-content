import Hero from "@/components/hero";
import LargeVideo from "@/components/large-video";

const Stack = ({ slices }) => {
  const showSlice = (slice) => {
    switch (slice.__component) {
      case "slices.hero":
        return <Hero data={slice} />;
      case "slices.large-video":
        return <LargeVideo data={slice} />;
      default:
        return "unknown";
    }
  };

  return (
    <div className="flex flex-col gap-16">
      {slices.map((slice) => (
        <div key={`${slice.__component}${slice.id}`}>{showSlice(slice)}</div>
      ))}
    </div>
  );
};

export default Stack;
