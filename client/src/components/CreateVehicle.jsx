import React from 'react';
import { withRouter } from 'react-router-dom';

function CreateVehicle(props) {
  return (
    <div className="add-new">
      <h2>Add a new book, TV show, or movie!</h2>
      <form className="create-form" onSubmit={(e) => {
        e.preventDefault();
        props.newVehicle(props.currentUser.id, props.vehicleForm);
      }}>


        <input
          type="text"
          name="title"
          placeholder="title"
          value={props.vehicleForm.title}
          onChange={props.handleVehicleFormChange} />

        <input
          type="text"
          name="language"
          placeholder="language"
          value={props.vehicleForm.language}
          onChange={props.handleVehicleFormChange} />

        <input
          type="text"
          name="image"
          placeholder="image"
          value={props.vehicleForm.image}
          onChange={props.handleVehicleFormChange} />

        <input
          type="text"
          name="genre"
          placeholder="genre"
          value={props.vehicleForm.genre}
          onChange={props.handleVehicleFormChange} />


        <input className="create-button" type="submit" value="Submit" />
      </form>
    </div >
  )
}

export default withRouter(CreateVehicle);