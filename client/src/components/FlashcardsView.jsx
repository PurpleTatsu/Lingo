import React from 'react';
import { withRouter } from 'react-router-dom';

function FlashcardsView(props) {
  // const { vehicle, flashcards, id } = props;

  return (

    <div className="flashcard-container">


      <div className="flashcard-page">

      </div>


      {
        props.flashcards && props.flashcards.map(flashcard => (

          <div
            key={flashcard.id}
            className="flashcard-card">

            <h3>{flashcard.vocab}</h3>
            <h3>{flashcard.vocab2}</h3>
            <h3>{flashcard.vocab3}</h3>
            <h3>{flashcard.description}</h3>
            <br></br>

            <button id={flashcard.id}
              onClick={() => {
                props.deleteFlashcard(flashcard.id)
              }}>
              Delete</button>

          </div>
        ))}



    </div>
  )
}

export default withRouter(FlashcardsView)