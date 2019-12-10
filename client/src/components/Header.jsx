import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>

      <img id="hamburger" src="https://github.com/PurpleTatsu/Lingo/blob/vehicle-edit/client/src/images/iconmonstr-menu-1-240.png?raw=true" alt="hamburger-menu" />

      <h1><Link to='/' onClick={props.resetForm}><img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/lingo%20logo.png?raw=true" className="lingo-logo" alt="lingo-logo" /></Link></h1>
      <h2>Books</h2>
      <h2>Movies</h2>
      <h2>TV Shows</h2>
      <div>
        {
          props.currentUser
            ?
            <>
              <p>{props.currentUser.username}</p>
              <button onClick={props.handleLogout}>logout</button>
            </>
            :
            <button id="login-button" onClick={props.handleLoginButton}>Login/register</button>
        }
      </div>

    </header >
  )
}