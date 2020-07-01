import Hero from "@/components/hero";

const Stack = ({ slices }) => {
  return (
    <div className="flex flex-col gap-16">
      {slices.map((slice) => {
        switch (slice.__component) {
          case "slices.hero":
            return <Hero data={slice} key={slice.id} />;
          default:
            return "unknown";
        }
      })}
    </div>
  );
};

export default Stack;
