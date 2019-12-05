import React from 'react';
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const LoginForm = (props) => {

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
      }} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        {/* <p>Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} /> */}
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr />
        <button>Login</button>
        <Link to="/register"><button>Register</button></Link>
      </form>
    </div>
  );
}

export default LoginForm;