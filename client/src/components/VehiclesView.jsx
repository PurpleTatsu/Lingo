import React from 'react';
import { withRouter } from 'react-router';

function VehiclesView(props) {

  return (

    <div className="vehicle-container">
      <img className="hero-image" src="https://github.com/PurpleTatsu/P4-Flashcards/blob/master/client/src/images/hero-image.jpg?raw=true" />
      {
        props.vehicles.map(vehicle => (

          <div
            key={vehicle.id}
            className="vehicle-card"
            onClick={(e) => {
              props.history.push(`/vehicles/${vehicle.id}`);
              window.scrollTo(0, 0);
            }}>
            <img alt={vehicle.title} src={vehicle.image} />
            <h3>{vehicle.language}</h3>
            <h3>{vehicle.title}</h3>
          </div>
        ))}

      <div
        className="add-new-vehicle"
        onClick={() => {
          props.history.push('/new/vehicle');
          window.scrollTo(0, 0);
        }}>
        <img
          alt="Add a new book, movie, or TV show"
          src="https://image.flaticon.com/icons/png/512/14/14980.png"
          className="plus-sign" />
        <h3>Add new media</h3>
      </div>
    </div>
  )
}

export default withRouter(VehiclesView)