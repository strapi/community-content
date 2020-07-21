import classNames from "classnames";
import PropTypes from "prop-types";
import { buttonLinkPropTypes } from "utils/types";

const ButtonLink = ({ button, appearance }) => {
  return (
    <a
      href={button.url}
      className={classNames(
        // Common classes
        "block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm px-8 py-4 border-2 rounded-md",
        // Specific to when the button is fully dark
        {
          "bg-primary-600 text-white border-primary-600": appearance === "dark",
        },
        // Specific to when the button is dark outlines
        {
          "text-primary-600 border-primary-600": appearance === "dark-outline",
        },
        // Specific to when the button is fully white
        {
          "bg-white text-primary-600 border-white": appearance === "white",
        },
        // Specific to when the button is white outlines
        {
          "text-white border-white": appearance === "white-outline",
        }
      )}
      // Change target and rel attributes is newTab is turned on
      target={button.newTab ? "_blank" : "_self"}
      rel={button.newTab ? "noopener noreferrer" : ""}
    >
      {button.text}
    </a>
  );
};

ButtonLink.propTypes = {
  button: buttonLinkPropTypes,
  appearance: PropTypes.oneOf([
    "dark",
    "white-outline",
    "light",
    "dark-outline",
  ]),
};

export default ButtonLink;
