import React from 'react';
import { Link } from 'react-router-dom';


const LoginForm = (props) => {

  return (
    <div className="page-topper">
      <div className="auth-container">
        <h2>Login</h2>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          props.handleLogin();

        }} >
          <p>Username:</p>
          <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
          <p>Password:</p>
          <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
          <hr />
          <button id="login-button">Login</button>
          <Link to="/register"><button className="register">Register</button></Link>
        </form>
      </div>
      {props.authError && <h3 className="error">{props.authError}</h3>}
    </div>
  );
}

export default LoginForm;