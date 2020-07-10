import Image from "./image";

const MobileNavMenu = ({ navLogo, navLinks, navButton }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-y-scroll bg-red-100 z-10">
      <div className="container">
        {/* Company logo */}
        <Image media={navLogo} className="h-8 w-auto object-contain" />
        <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
          {navLinks.map((navLink) => (
            <li key={navLink.id}>
              <a href={navLink.url} className="hover:text-gray-900 px-2 py-1">
                {navLink.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavMenu;
