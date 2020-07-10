import Link from "next/link";
import ButtonLink from "./elements/button-link";
import Navbar from "./elements/navbar";
import Footer from "./elements/footer";

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
    <>
      {/* Visible page content */}
      <div className="flex flex-col justify-between min-h-screen">
        {/* Aligned to top */}
        <div className="flex-1">
          <Navbar navLogo={navLogo} navLinks={navLinks} navButton={navButton} />
          <div>{children}</div>
        </div>
        {/* Aligned to bottom */}
        <Footer
          footerSections={footerSections}
          footerSmallText={footerSmallText}
          footerLogo={footerLogo}
        />
      </div>
    </>
  );
};

export default Layout;
