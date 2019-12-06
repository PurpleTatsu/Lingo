import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function EditVehicle(props) {
  return (
    <div className="edit-vehicle">
      <h3>Edit Media</h3>
      <form onSubmit={props.handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="title"
          value={props.title}
          onChange={props.handleVehicleFormChange} />

        <input
          type="text"
          name="language"
          placeholder="language"
          value={props.language}
          onChange={props.handleVehicleFormChange} />

        <input
          type="text"
          name="image"
          placeholder="image"
          value={props.image}
          onChange={props.handleVehicleFormChange} />

        <input
          type="text"
          name="genre"
          placeholder="genre"
          value={props.genre}
          onChange={props.handleVehicleFormChange} />

        <button>Submit</button>
        <button onClick={props.onCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default withRouter(EditVehicle);