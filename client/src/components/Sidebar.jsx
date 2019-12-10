import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    // <Menu {...props}>

    <Sidebar {...props}>
      <a className="hamburger-nav" href="/">
        Home
      </a>

      <a className="hamburger-nav" href="/">
        Books
      </a>

      <a className="hamburger-nav" href="/">
        Movies
      </a>

      <a className="hamburger-nav" href="/">
        TV Shows
      </a>
    </Sidebar>
  );
};

