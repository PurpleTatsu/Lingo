import React from 'react';
import { withRouter } from 'react-router';

function FlashcardsView(props) {
  const {vehicle, flashcards } = this.props;

  return (
    <div className="flashcard-container">

     
      <div className="flashcard-page">
          <button
            onClick={() => {
              // this.props.history.push(`/vehicles/${vehicle.id}/flashcard/new`);
              this.props.history.push(`/new/flashcard`);
              window.scrollTo(0, 0);
            }}>Add flashcard</button>

          
        </div>
        <h3>Add new vocabulary</h3>
    
  
      {
            flashcards.map(flashcard => (

              <div
                key={this.props.flashcard.id}
                className="flashcard-card"
                onClick={(e) => {
                  this.props.history.push(`/flashcards/${flashcard.id}`);
                  window.scrollTo(0, 0);
                }}>

                <h3>{this.props.flashcard.vocab}</h3>
                <h3>{this.props.flashcard.vocab2}</h3>
                <h3>{this.props.flashcard.vocab3}</h3>
                <h3>{this.props.flashcard.description}</h3>

              </div>
            ))}
    

      
    </div>
  )
}

export default withRouter(FlashcardsView)