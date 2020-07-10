import Hero from "@/components/sections/hero";
import LargeVideo from "@/components/sections/large-video";
import FeatureColumnsGroup from "@/components/sections/feature-columns-group";
import FeatureRowsGroup from "@/components/sections/feature-rows-group";
import BottomActions from "@/components/sections/bottom-actions";
import TestimonialsGroup from "@/components/sections/testimonials-group";

// Map Strapi sections to section components
const sectionComponents = {
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.bottom-actions": BottomActions,
  "sections.testimonials-group": TestimonialsGroup,
};

// Display a section individually
const Section = ({ sectionData, index }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={sectionData} />;
};

// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && (
        <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
          <div className="container">Preview mode is on</div>
        </div>
      )}
      {/* Show the actual sections */}
      {sections.map((section, index) => (
        <Section
          sectionData={section}
          index={index}
          key={`${section.__component}${section.id}`}
        />
      ))}
    </div>
  );
};

export default Sections;
