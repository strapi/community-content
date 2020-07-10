import PropTypes from "prop-types";

export const linkPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
});

export const mediaPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  alternativeText: PropTypes.string,
  mime: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const buttonLinkPropTypes = PropTypes.shape({
  theme: PropTypes.string,
  text: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
});
