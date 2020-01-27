import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function TvShows(props) {

  return (
    <div className="page-topper">

      <div className="show-container">

        <h1 className="container-title">TV Shows</h1>
        
        <div id="shows">
          {
            props.vehicles.filter(vehicle=> vehicle.category==="TV Show").map(vehicle=>
         

              <div
                key={vehicle.id}
                className="vehicle-card"
                onClick={(e) => {
                  props.history.push(`/vehicles/${vehicle.id}`);
                  window.scrollTo(0, 0);
                }}>
                <h3>{vehicle.title}</h3>
                <h3>{vehicle.language}</h3>
                {/* <h3>{vehicle.category}</h3> */}
                <img alt={vehicle.title} src={vehicle.image} />
              </div>
            )}
          
        
        </div>

      </div>
    </div>
  )
}

export default withRouter(TvShows)