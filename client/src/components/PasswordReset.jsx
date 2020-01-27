import React from 'react';
import { Link } from 'react-router-dom';

const PasswordReset = (props) => {
  return (
    <div>
      <h1>Reset Password</h1>



      <h1>Reset Password</h1>
{/* 
<%= form_for @user, :url => password_reset_path(params[:id]) do |f| %>
  <% if @user.errors.any? %>
    <div class='error_messages'>
      <h2>Form is invalid</h2>
      <ul>
        <% for message in @user.errors.full_messages %>
          <li><%= message %></li>
        <% end %>
      </ul>
    </div>
  <% end %>

  <div class='field'>
    <%= f.label :password %>
    <%= f.password_field :password %>
  </div>
  <div class='field'>
    <%= f.label :password_confirmation %>
    <%= f.password_field :password_confirmation %>
  </div>
  <div class='actions'><%= f.submit 'Update password' %></div>
<% end %> */}



      <form onSubmit={props.resetPassword} >

        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <p>Confirm Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />

        <button>Update</button>
      </form>







    </div>
  )
}

export default PasswordReset

