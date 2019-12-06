import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function VehiclesView(props) {

  return (

    <div className="vehicle-container">
      <div className="hero-section">
        <img className="hero-image" src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/hero-image.jpg?raw=true" />



      
          
{/* className="add-new-vehicle" id="loading"  */}
        
        <Link to="/new/vehicle">
        <div className="container">

            <img src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/PinClipart.com_ground-hog-day-clip_1980971.png?raw=true" />
            <div className="centered">Add New Media</div>

            </div>
        </Link>
         

          {/* <img
            alt="Add a new book, movie, or TV show"
            src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-plus-3.png&r=255&g=255&b=255"
            className="plus-sign" /> */}
          {/* <h3>Add new media</h3>
        </div> */}
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
      )
    }
    
export default withRouter(VehiclesView)