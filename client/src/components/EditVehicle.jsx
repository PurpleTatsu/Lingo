import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function EditVehicle(props) {
  return (
    <div>
      <h3>Edit</h3>
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
        <Link to="/vehicle/:id"><button>Cancel</button></Link>
      </form>
    </div>
  )
}

export default withRouter(EditVehicle);