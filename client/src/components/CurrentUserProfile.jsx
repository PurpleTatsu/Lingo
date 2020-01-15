import React from 'react';
import { withRouter } from 'react-router';


function CurrentUserProfile(props) {
  return (
    

    <div className="page-topper" id="current-user-profile">

    <div className="vehicle-page">

            <div className="vehicle-hero">
              <div className="vehicle-info">

      
   
              <p>{props.currentUser.username}</p>
              <p>{props.currentUser.email}</p>


    </div>
    </div>
    </div>
    </div>
  )
}


export default withRouter(CurrentUserProfile);