import React from 'react';
import { withRouter } from 'react-router-dom';

function CreateVehicle(props) {
  console.log(props)
  return (
    <div>
      <h2>Add a new book/tv show/movie</h2>
      <form className="create-form" onSubmit={(e) => {
        e.preventDefault();
        props.newVehicle(props.currentUser.id, props.vehicleForm);
      }}>


        <input
          type="text"
          name="title"
          placeholder="title"
          value={props.vehicleForm.title}
          onChange={props.handleFormChange} />

        <input
          type="text"
          name="language"
          placeholder="language"
          value={props.vehicleForm.language}
          onChange={props.handleFormChange} />

        <input
          type="text"
          name="image"
          placeholder="image"
          value={props.vehicleForm.image}
          onChange={props.handleFormChange} />

        <input
          type="text"
          name="genre"
          placeholder="genre"
          value={props.vehicleForm.genre}
          onChange={props.handleFormChange} />


        <input className="create-button" type="submit" value="Submit" />
      </form>
    </div >
  )
}

export default withRouter(CreateVehicle);