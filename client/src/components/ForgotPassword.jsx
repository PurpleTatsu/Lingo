import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

export default class LoginForm extends Component {
  state = {
    email: "",
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  render() {
    return (
      
      <div className="forgot-password">

        <h1>Reset Password</h1>


        <form onSubmit={(e) => {
          e.preventDefault();
          props.handleLogin();

        }} >
            <input
              type='email'
              placeholder='email'
              name='email'
              value={email}
            onChange={props.handleChange}
          />
       
        
            <input type='submit' className='btn btn-primary' value='Reset Password' />
        </form>
        
        </div>
   







)
}
}

// export default withRouter(ForgotPassword);