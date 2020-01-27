import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Books(props) {

  return (
    <div className="page-topper">

      <div className="book-container">

      <h1 className="container-title">Books</h1>

        <div id="books">
          {
            props.vehicles.filter(vehicle=> vehicle.category==="Book").map(vehicle=>
         

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

export default withRouter(Books)