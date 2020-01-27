import React from 'react';
import { withRouter } from 'react-router';


function CurrentUserProfile(props) {
  return (
    

    <div className="page-topper" id="current-user-profile">

    <div className="vehicle-page">

            <div className="vehicle-hero">
              <div className="vehicle-info">

      
   
              <h3>{props.currentUser.username}</h3>
              <p>{props.currentUser.email}</p>
          <h3>More coming soon!</h3>


          </div>
    </div>
    </div>
    </div>
  )
}


export default withRouter(CurrentUserProfile);