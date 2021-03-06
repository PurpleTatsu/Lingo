import React from 'react';
import { withRouter } from 'react-router-dom';

function EditVehicle(props) {
  return (
    <div className="edit-vehicle">
      <h3>Edit Media</h3>
      <form className="edit-form" onSubmit={(e) => {
        
        e.preventDefault();
        props.editSubmit(props.vehicleId, props.vehicleForm);
       
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
       
        <input
          type="text"
          name="category"
          placeholder="category: Book, TV Show, etc"
          value={props.vehicleForm.category}
          onChange={props.handleVehicleFormChange} />

        <button>Submit</button>
      </form>
        <button className="resetForm" onClick={props.resetForm}>Cancel</button>
    </div>
  )
}

export default withRouter(EditVehicle);