import React, { Component } from 'react';
import EditVehicle from './EditVehicle'
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { verifyUser, createFlashcard, readAllFlashcards, updateFlashcard, destroyFlashcard } from '../services/api-helper'
import FlashcardsView from './FlashcardsView'
import CreateFlashcard from './CreateFlashcard'


class VehiclesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isEdit: false,
      flashcards: [],
      flashcardForm: {
        vocab: "",
        vocab2: "",
        vocab3: "",
        description: "",
      },
    }
    
  }
  
  async flashcardDidMount() {
    debugger;
    this.getFlashcards();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }


//read
getFlashcards = async () => {
  const flashcards = await readAllFlashcards();
  this.setState({
    flashcards
  })
}
  
//create
  newFlashcard = async vehicleId => {
    const flashcard = await createFlashcard(vehicleId, this.state.flashcardForm);
    this.setState(prevState => ({
      flashcards: [...prevState.flashcards, flashcard]
    }));
    this.props.history.push("/");
  };


  vehiclesDidMount() {
    this.readAllVehicles();
  }
  flashcardsDidMount() {
    this.readAllFlashcards();
  }
  // componentDidMount() {
  //   this.props.mountEditForm(this.props.id);
  // }

//update/edit
  handleFormChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    this.setState(prevState => ({
      flashcardForm: {
        ...prevState.flashcardForm,
        [name]: value
      }
    }))
  }

  mountEditForm = async (id) => {
    const flashcards = await readAllFlashcards();
    const flashcard = flashcards.find(el => el.id === parseInt(id));
    this.setState({
      flashcardForm: flashcard,
    });
  }

  resetForm = () => {
    this.setState({
      flashcardForm: {
        vocab: "",
        vocab2: "",
        vocab3: "",
        description: ""
      }
    })
  }

  editFlashcard = async () => {
    const { flashcardForm } = this.state
    await updateFlashcard(flashcardForm.id, flashcardForm);
    this.setState(prevState => (
      {
        flashcards: prevState.flashcards.map(flashcard => {
          return flashcard.id === flashcardForm.id ? flashcardForm : flashcard
        }),
      }
    ))
  }

  /////// DELETE ///////
  deleteFlashcard = async (id) => {
    await destroyFlashcard(id);
    this.setState(prevState => ({
      flashcards: prevState.flashcards.filter(flashcard => flashcard.id !== id)
    }))
  }



 

  render() {
    const { vehicle } = this.props;

    return (
      <div>
        {vehicle === undefined ? <h2>Loading . . .</h2> : (
          <div className="vehicle-page">
            <img alt={vehicle.title} src={vehicle.image} />
            <h3>{vehicle.genre}</h3>
            <h3>{vehicle.language}</h3>

            {this.state.isEdit ?
              <Route path={'/vehicles/:id/edit'} render={() => (
                <EditVehicle
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editVehicle();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/vehicles/${this.props.vehicleForm.id}`)
                  }}
                  vehicleForm={this.props.vehicleForm} />
              )} />
              :
              <>
                <h1>{vehicle.title}</h1>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/vehicles/${vehicle.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deleteVehicle(vehicle.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
          
          <Route
          path="/new/flashcard"
          render={() => (
            <CreateFlashcard
              handleFormChange={this.handleFormChange}
              flashcardForm={this.state.flashcardForm}
              newFlashcard={this.newFlashcard}
              currentUser={this.state.currentUser}
            />
          )} />
        
          <Route
          exact path="/vehicles/:id"
          render={() => (
            <FlashcardsView
              flashcard={this.state.flashcard}
              flashcardForm={this.state.flashcardForm}
              handleFormChange={this.handleFormChange}
              newFlashcard={this.newFlashcard} />
          )}
        />
      </div>)
  }
}

export default withRouter(VehiclesPage);