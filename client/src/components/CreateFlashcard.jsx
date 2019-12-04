import React from 'react';
import { withRouter } from 'react-router-dom';

function CreateFlashcard(props) {
  console.log(props)
  return (
    <div>
      <h2>Create a new flashcard</h2>
      <form className="create-form" onSubmit={(e) => {
        e.preventDefault();
        props.newFlashcard(props.currentUser.id, props.flashcardForm);
      }}>

        <input
          type="text"
          name="vocab"
          placeholder="vocab"
          value={props.flashcardForm.vocab}
          onChange={props.handleFormChange} />

        <input
          type="text"
          name="vocab2"
          placeholder="vocab2"
          value={props.vehicleForm.vocab2}
          onChange={props.handleFormChange} />

        <input
          type="text"
          name="vocab3"
          placeholder="vocab3"
          value={props.vehicleForm.vocab3}
          onChange={props.handleFormChange} />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={props.vehicleForm.description}
          onChange={props.handleFormChange} />


        <input className="create-button" type="submit" value="Submit" />
      </form>
    </div >
  )
}

export default withRouter(CreateFlashcard);