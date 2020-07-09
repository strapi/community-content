import Hero from "@/components/hero";
import LargeVideo from "@/components/large-video";
import FeatureColumnsGroup from "@/components/feature-columns-group";
import FeatureRowsGroup from "@/components/feature-rows-group";
import BottomActions from "@/components/bottom-actions";
import TestimonialsGroup from "@/components/testimonials-group";

const sectionComponents = [
  {
    name: "sections.hero",
    component: Hero,
    hasMargins: true,
  },
  {
    name: "sections.large-video",
    component: LargeVideo,
    hasMargins: true,
  },
  {
    name: "sections.feature-columns-group",
    component: FeatureColumnsGroup,
    hasMargins: true,
  },
  {
    name: "sections.feature-rows-group",
    component: FeatureRowsGroup,
    hasMargins: true,
  },
  {
    name: "sections.bottom-actions",
    component: BottomActions,
    hasMargins: false,
  },
  {
    name: "sections.testimonials-group",
    component: TestimonialsGroup,
    hasMargins: false,
  },
];

const Sections = ({ sections, preview }) => {
  // Detect the spacings required around a section based on its settings
  // and its siblings' settings
  const getSpacings = (componentData, index) => {
    const isFirstSection = index === 0;
    const isLastSection = index === sections.length - 1;

    // Leave some space above the footer
    const marginBottom =
      isLastSection && componentData.hasMargins ? "mb-10 " : "";

    // Handle the first section separately
    if (isFirstSection) {
      if (componentData.hasMargins) {
        // Leave some space under the navbar
        return marginBottom + "mt-10";
      }
      return marginBottom;
    }

    // Otherwise adapt spacings to the previous section
    const previousComponentName = sections[index - 1].__component;
    const previousComponentData = sectionComponents.find(
      (component) => component.name === previousComponentName
    );
    if (previousComponentData.hasMargins || componentData.hasMargins) {
      return marginBottom + "mt-24";
    }
    return marginBottom;
  };

  // Display the right component for each section
  const showSection = (sectionData, index) => {
    // Find the settings for the matching section
    const componentData = sectionComponents.find(
      (component) => component.name === sectionData.__component
    );
    // Prepare the component
    const SectionComponent = componentData.component;
    const spacings = getSpacings(componentData, index);
    // Display the section
    return (
      <div
        className={spacings}
        key={`${sectionData.__component}${sectionData.id}`}
      >
        <SectionComponent data={sectionData} />
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && (
        <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
          <div className="container">Preview mode is on</div>
        </div>
      )}
      {/* Show the actual sections */}
      {sections.map(showSection)}
    </div>
  );
};

export default Sections;
