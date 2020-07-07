import Link from "next/link";
import ButtonLink from "./button-link";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Aligned to top */}
      <div className="flex-1">
        <nav className="border-gray-200 border-b-2 py-6 sm:py-2 mb-10">
          <div className="container flex flex-row items-center justify-between">
            <Link href="/[[...slug]]" as="/">
              <a>
                <img
                  src="https://assets.brandfolder.com/pl546j-7le8zk-838dm2/view@2x.png?v=1592396063"
                  className="h-8 w-auto object-contain"
                  alt="Slack"
                />
              </a>
            </Link>
            <div className="hidden md:block">
              <ButtonLink
                button={{
                  theme: "purple",
                  link: {
                    href: "https://slack.com/signin",
                    text: "Launch Slack",
                    newTab: true,
                  },
                }}
              />
            </div>
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
