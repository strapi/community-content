import classNames from "classnames";

const ButtonLink = ({ button }) => {
  return (
    <a
      href={button.link.href}
      className={classNames(
        // Common classes
        "block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm px-8 py-4 border-2 rounded-md",
        // Specific to when the button is purple
        {
          "bg-primary text-white border-primary": button.theme === "purple",
        },
        // Specific to when the button is white
        {
          "bg-white text-primary border-primary": button.theme === "white",
        }
      )}
      // Change target and rel attributes is newTab is turned on
      target={button.link.newTab ? "_blank" : "_self"}
      rel={button.link.newTab ? "noopener noreferrer" : ""}
    >
      {button.link.text}
    </a>
  );
};

export default ButtonLink;
