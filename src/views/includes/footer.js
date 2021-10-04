import React from "react";
import { useVisible } from "../../hooks";
import { scrollTop } from "../../utils";

const Footer = () => {
  const showScrollTop = useVisible(200);

  return (
    <footer id={`site-footer`}>
      <div
        id={`go-top`}
        className={`d-flex align-items-center bg-movie-green text-white cursor-pointer rounded${
          showScrollTop ? " on" : ""
        }`}
        onClick={() => scrollTop()}
      >
        <i className={`fas fa-long-arrow-up m-auto`} />
        <span className={`sr-only`}>Scroll to TOP</span>
      </div>
    </footer>
  );
};

export default Footer;
