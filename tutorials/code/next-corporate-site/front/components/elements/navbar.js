import Link from "next/link";
import { useState } from "react";
import MobileNavMenu from "./mobile-nav-menu";
import { getStrapiMedia } from "utils/media";
import ButtonLink from "../button-link";
import Image from "./image";

const Navbar = ({ navLogo, navLinks, navButton }) => {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  return (
    <>
      {/* The actual navbar */}
      <nav className="border-gray-200 border-b-2 py-6 sm:py-2">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/[[...slug]]" as="/">
              <a>
                <Image media={navLogo} className="h-8 w-auto object-contain" />
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

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navLogo={navLogo}
          navLinks={navLinks}
          navButton={navButton}
        />
      )}
    </>
  );
};

export default Navbar;
