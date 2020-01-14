import React from 'react';
import { Link } from 'react-router-dom';

const PasswordReset = (props) => {
  return (
    <div>
      <h1>Reset Password</h1>



  {/* <%= form_for @user, :url => password_reset_path(params[:id]) do |f| %>
  <% if @user.errors.any? %>
    <div class='error_messages'>
      <h2>Form is invalid</h2>
      <ul>
        <% for message in @user.errors.full_messages %>
          <li><%= message %></li>
        <% end %>
      </ul>
    </div>
  <% end %> */}



      <hr />
        <form onSubmit={props.resetPassword} >
          
          <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
          <p>Confirm Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        
        <hr />
        
          <button>Update</button>
        </form>
      






</div>
  )
}

export default PasswordReset
  
