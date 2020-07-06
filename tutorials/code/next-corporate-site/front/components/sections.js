import Hero from "@/components/hero";
import LargeVideo from "@/components/large-video";
import FeatureColumnsGroup from "@/components/feature-columns-group";
import FeatureRowsGroup from "@/components/feature-rows-group";
import BottomActions from "@/components/bottom-actions";
import TestimonialsGroup from "@/components/testimonials-group";

const Sections = ({ sections }) => {
  const showSection = (section) => {
    switch (section.__component) {
      case "sections.hero":
        return <Hero data={section} />;
      case "sections.large-video":
        return <LargeVideo data={section} />;
      case "sections.feature-columns-group":
        return <FeatureColumnsGroup data={section} />;
      case "sections.feature-rows-group":
        return <FeatureRowsGroup data={section} />;
      case "sections.bottom-actions":
        return <BottomActions data={section} />;
      case "sections.testimonials-group":
        return <TestimonialsGroup data={section} />;
      default:
        return "unknown";
    }
  };

  return (
    <div className="flex flex-col gap-32">
      {sections.map((section) => (
        <div key={`${section.__component}${section.id}`}>
          {showSection(section)}
        </div>
      ))}
    </div>
  );
};

export default Sections;
