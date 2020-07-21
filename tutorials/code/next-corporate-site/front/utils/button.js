// Decide what the button will look like based on its type (primary or secondary)
// and on its background (light or dark).
export function getButtonAppearance(type, background) {
  if (type === "primary") {
    if (background === "light") {
      // Dark primary button on a light background
      return "dark";
    }
    // Fully white primary button on a dark background
    return "white";
  } else if (type === "secondary") {
    if (background === "light") {
      // Dark outline primary button on a light background
      return "dark-outline";
    }
    // White outline primary button on a dark background
    return "white-outline";
  }

  // Shouldn't happen, but default to dark button just in case
  return "dark";
}
