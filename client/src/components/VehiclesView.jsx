import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function VehiclesView(props) {

  return (
    <div className="page-topper">

    <div className="vehicle-container">
      <div className="hero-section">
        <img className="hero-image" src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/hero-image.jpg?raw=true" alt="hero-display"/>



      
          
        
        <Link to="/new/vehicle">
        <div className="container">

            <img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/PinClipart.com_ground-hog-day-clip_1980971.png?raw=true" alt="loading-circle"/>
            <div className="centered">Add New Media</div>

            </div>
        </Link>
         
        </div>
        <div id="media">
          {
            props.vehicles.map(vehicle => (

              <div
                key={vehicle.id}
                className="vehicle-card"
                onClick={(e) => {
                  props.history.push(`/vehicles/${vehicle.id}`);
                  window.scrollTo(0, 0);
                }}>
                <h3>{vehicle.language}</h3>
                <img alt={vehicle.title} src={vehicle.image} />
                <h3>{vehicle.title}</h3>
              </div>
            ))}
        </div>

      </div>
      </div>
      )
    }
    
export default withRouter(VehiclesView)