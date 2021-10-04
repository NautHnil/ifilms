import React from "react";
import { useVisible } from "../../hooks";
import Logo from "./logo";
import Navigation from "./navigation";
import Search from "./search";

const Header = () => {
  const isScroll = useVisible(80);

  return (
    <>
      {isScroll ? <div className={`pt-80`} /> : ""}
      <header id={`site-header`} className={isScroll ? "on-scroll shadow" : ""}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className={`container`}>
            <Logo />

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Navigation />

              <Search />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
