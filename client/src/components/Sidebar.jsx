import React from "react";
import { slide as Sidebar } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    // <Menu {...props}>

    <Sidebar {...props}>
      <a className="hamburger-nav" href="/">
        Home
      </a>

      <a className="hamburger-nav" href="/books">
        Books
      </a>

      <a className="hamburger-nav" href="/movies">
        Movies
      </a>

      <a className="hamburger-nav" href="/tv-shows">
        TV Shows
      </a>
      <img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/lingo%20logo.png?raw=true" className="lingo-logo" alt="lingo-logo" />
    </Sidebar>
  );
};


