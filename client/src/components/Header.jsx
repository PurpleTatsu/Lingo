import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <img id="hamburger" srcc="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-menu-1.png&r=255&g=255&b=255"/>
      <h1><Link to='/' onClick={props.resetForm}><img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/lingo%20logo.png?raw=true" className="lingo-logo"/></Link></h1>
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
      
    </header>
  )
}