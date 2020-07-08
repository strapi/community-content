import Link from "next/link";
import ButtonLink from "./button-link";
import { getStrapiMedia } from "utils/images";

const Layout = ({ children, global }) => {
  const {
    navLogo,
    navButton,
    navLinks,
    footerSections,
    footerLogo,
    footerSmallText,
  } = global;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Aligned to top */}
      <div className="flex-1">
        <nav className="border-gray-200 border-b-2 py-6 sm:py-2">
          <div className="container flex flex-row items-center justify-between">
            {/* Content aligned to the left */}
            <div className="flex flex-row items-center">
              <Link href="/[[...slug]]" as="/">
                <a>
                  <img
                    src={getStrapiMedia(navLogo.url)}
                    alt={navLogo.alternativeText}
                    className="h-8 w-auto object-contain"
                  />
                </a>
              </Link>
              <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
                {navLinks.map((navLink) => (
                  <li key={navLink.id}>
                    <a
                      href={navLink.url}
                      className="hover:text-gray-900 px-2 py-1"
                    >
                      {navLink.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {navButton && (
              <div className="hidden md:block">
                <ButtonLink
                  button={{
                    theme: navButton.theme,
                    url: navButton.url,
                    text: navButton.text,
                    newTab: navButton.newTab,
                  }}
                />
              </div>
            )}
          </div>
        </nav>
        <div>{children}</div>
      </div>
      {/* Aligned to bottom */}
      <footer className="pt-12">
        <div className="container flex flex-row justify-between">
          <div>
            {footerLogo && (
              <img
                className="h-8 w-auto object-contain"
                src={getStrapiMedia(footerLogo.url)}
              />
            )}
          </div>
          <nav className="flex flex-row gap-20 items-start justify-end mb-10">
            {footerSections.map((footerSection) => (
              <div key={footerSection.id}>
                <p className="uppercase tracking-wide font-semibold">
                  {footerSection.title}
                </p>
                <ul className="mt-2">
                  {footerSection.links.map((link) => (
                    <li key={link.id} className="text-gray-700 py-1 px-1 -mx-1">
                      <a
                        href={link.url}
                        className="hover:text-gray-900"
                        // Change target and rel attributes is newTab is turned on
                        target={link.newTab ? "_blank" : "_self"}
                        rel={link.newTab ? "noopener noreferrer" : ""}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="container text-sm bg-gray-100 py-6 text-gray-700">
          {footerSmallText}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
