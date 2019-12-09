import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function FlashcardsView(props) {
  const { vehicle, flashcards, id } = props;

  return (
    <div className="flashcard-container">


      <div className="flashcard-page">

        {/* <Link to={`/vehicles/${id}/flashcard/new`}>Add flashcard</Link> */}



      </div>


      {
        props.flashcards && props.flashcards.map(flashcard => (

          <div
            key={flashcard.id}
            className="flashcard-card"
          // onClick={(e) => {
          //   this.props.history.push(`/flashcards/${flashcard.id}`);
          //   window.scrollTo(0, 0);
          // }
          >

            <h3>{flashcard.vocab}</h3>
            <h3>{flashcard.vocab2}</h3>
            <h3>{flashcard.vocab3}</h3>
            <h3>{flashcard.description}</h3>
            <br></br>

            {/* <button onClick={() => {
              this.props.deleteFlashcard(flashcard.id);
              this.props.history.push(`/vehicles/${this.props.vehicleId}/`)
            }}>Delete</button> */}


            <button id={flashcard.id}
              onClick={() => {
                props.deleteFlashcard(flashcard.id)
              }}>
              Delete</button>



            {/* <button onClick={() => {
                          setEdit(flashcard.id);
                          this.props.history.push(`/vehicles/${flashcard.id}/edit`)
                        }}>Edit</button> */}
          </div>
        ))}



    </div>
  )
}

export default withRouter(FlashcardsView)