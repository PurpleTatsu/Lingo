import React from 'react';
import { withRouter } from 'react-router-dom';

function CreateFlashcard(props) {

  return (
    <div className="add-new">
      <h2>Create a new flashcard</h2>
      <form className="create-form" onSubmit={(e) => {
        e.preventDefault();
        props.newFlashcard(props.match.params.id,props.flashcardForm);
      }}>

        <input
          type="text"
          name="vocab"
          placeholder="vocab"
          value={props.flashcardForm.vocab}
          onChange={props.handleFlashcardFormChange} />

        <input
          type="text"
          name="vocab2"
          placeholder="vocab2"
          value={props.flashcardForm.vocab2}
          onChange={props.handleFlashcardFormChange} />

        <input
         type="text"
         name="vocab3"
         placeholder="vocab3"
         value={props.flashcardForm.vocab3}
         onChange={props.handleFlashcardFormChange} />

        <input
          type="text"
          name="description"
          placeholder="description"
          value={props.flashcardForm.description}
          onChange={props.handleFlashcardFormChange} />


        <input className="create-button" type="submit" value="Submit" />
        <button onClick={props.resetForm}>Cancel</button>
       

      </form>
    </div >
  )
}

export default withRouter(CreateFlashcard);