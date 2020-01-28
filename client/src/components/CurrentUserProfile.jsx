import React from 'react';
import { withRouter } from 'react-router';


function CurrentUserProfile(props) {
  window.scrollTo(0, 0);
  return (


    <div className="page-topper" id="current-user-profile">

      <div className="vehicle-page">

        <div className="vehicle-hero">
          <div className="vehicle-info">
            <h3>{props.currentUser.username}</h3>
            <p>{props.currentUser.email}</p>
            <h3>More coming soon!</h3>

            <div className="bookmarked">
              {
                props.vehicles.filter(vehicle => vehicle.category === "Movie").map(vehicle =>


                  <div
                    key={vehicle.id}
                    className="vehicle-card"
                    onClick={(e) => {
                      props.history.push(`/vehicles/${vehicle.id}`);
                      window.scrollTo(0, 0);
                    }}>
                    <h3>Starred Pages</h3>
                    <h3>{vehicle.title}</h3>
                    <h3>{vehicle.language}</h3>
                    {/* <h3>{vehicle.category}</h3> */}
                    <img alt={vehicle.title} src={vehicle.image} />
                  </div>
                )}
            </div>



          </div>
        </div>
      </div>
    </div>
  )
}


export default withRouter(CurrentUserProfile);