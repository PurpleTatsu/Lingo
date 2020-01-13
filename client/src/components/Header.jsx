import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <h1><Link to='/' onClick={props.resetForm}><img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/lingo%20logo.png?raw=true" className="lingo-logo" alt="lingo-logo" /></Link></h1>
      <h2 title="Coming Soon!">Books</h2>
      <h2 title="Coming Soon!">Movies</h2>
      <h2 title="Coming Soon!">TV Shows</h2>
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