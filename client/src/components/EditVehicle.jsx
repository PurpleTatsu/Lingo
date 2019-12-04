import React from 'react';
import { withRouter } from 'react-router-dom';

function EditTeacher(props) {
  return (
    <div>
      <h3>Edit</h3>
      <form onSubmit={props.handleSubmit}>

        
        <input
          type="text"
          name="title"
          placeholder="title"
          value={props.vehicleForm.name}
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
        
        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(EditTeacher);