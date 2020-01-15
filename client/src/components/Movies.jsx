import React from 'react';
import { withRouter } from 'react-router-dom';

function Movies(props){
  return(
    <div className="page-topper">

      <div className="movie-container">
        
    <h1 className="container-title">Movies</h1>

      <div id="movies">
        {
          props.vehicles.filter(vehicle=> vehicle.category==="Movie").map(vehicle=>
       

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

export default withRouter(Movies);