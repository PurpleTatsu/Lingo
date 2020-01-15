import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <h1><Link to='/' onClick={props.resetForm}><img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/lingo%20logo.png?raw=true" className="lingo-logo" alt="lingo-logo" /></Link></h1>
      <Link to="books"><h2>Books</h2></Link>
      <Link to="/movies"><h2>Movies</h2></Link>
      <Link to="/tv-shows"><h2>TV Shows</h2></Link>
      <div>
        {
          props.currentUser
            ?
            <>
              <Link to="/profile"><p>{props.currentUser.username}</p></Link>
              <button onClick={props.handleLogout}>Logout</button>
            </>
            :
            <button id="login-button" onClick={props.handleLoginButton}>Login/register</button>
        }
      </div>

    </header >
  )
}