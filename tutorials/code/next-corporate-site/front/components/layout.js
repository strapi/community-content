import Link from "next/link";
import ButtonLink from "./button-link";
import { getStrapiMedia } from "utils/images";

const Layout = ({ children, global }) => {
  const { navLogo, navButton, navLinks } = global;
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Aligned to top */}
      <div className="flex-1">
        <nav className="border-gray-200 border-b-2 py-6 sm:py-2 mb-10">
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
                    <a href={navLink.url} className="hover:underline px-2 py-1">
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
      <footer className="bg-gray-200 py-6">
        <div className="container text-sm text-gray-700">
          © Copyright 2020 Slack Technologies, Inc. All rights reserved. Various
          trademarks held by their respective owners.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
