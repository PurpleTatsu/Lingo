import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import VehiclesView from './components/VehiclesView';
import VehiclePage from './components/VehiclePage';
import CreateVehicle from './components/CreateVehicle'
import LoginForm from './components/LoginForm';
import EditVehicle from './components/EditVehicle';
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import FlashcardsView from './components/FlashcardsView'
import { createVehicle, readAllVehicles, updateVehicle, destroyVehicle, loginUser, registerUser, verifyUser } from './services/api-helper'
import { createFlashcard, readAllFlashcards, destroyFlashcard } from './services/api-helper'

import './App.css';
import CreateFlashcard from './components/CreateFlashcard';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      vehicleForm: {
        title: "",
        image: "",
        genre: "",
        language: ""
      },
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: "",
      },
      flashcards: [],
      flashcardForm: {
        vocab: "",
        vocab2: "",
        vocab3: "",
        description: "",
      },
    };
  }

  async componentDidMount() {
    this.handleVerify()
    const currentUser = await verifyUser();
    const vehicles = await readAllVehicles();
    if (currentUser) {
      this.setState({
        currentUser,
        vehicles
      })
    }
  }



    // const currentUser = await verifyUser();
    // if (currentUser) {
    //   this.setState({
    //     currentUser
    //   })
    // } else {
    //   console.log('there is no one signed in')
    // }
  

  // async componentDidMount() {
  //   this.getVehicles();
  //   const vehicles = await readAllVehicles();
  //   const currentUser = await verifyUser();
  //   }
  // }

  /////// Read ///////
  getVehicles = async () => {
    const vehicles = await readAllVehicles();
    this.setState({
      vehicles
    })
  }

  getFlashcards = async (id) => {
    const flashcards = await readAllFlashcards(id);
    this.setState({
      flashcards
    })
  }

  /////// Create ///////
  newVehicle = async userId => {
    const vehicle = await createVehicle(userId, this.state.vehicleForm);
    this.setState(prevState => ({
      vehicles: [...prevState.vehicles, vehicle]
    }));
    this.props.history.push("/");
  };

  newFlashcard = async (id, data) => {
    const flashcard = await createFlashcard(id, data);
    this.setState(prevState => ({
      flashcards: [...prevState.flashcards, flashcard]
    }));
    this.props.history.push(`/vehicles/${id}`); //returns undefined, fix later
  };

  /////// Update/Edit ///////

  handleVehicleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      vehicleForm: {
        ...prevState.vehicleForm,
        [name]: value
      }
    }));
  }

  editSubmit = async (id) => {
    // const { vehicleForm } = this.state
    const editedVehicle = await updateVehicle(id, this.state.vehicleForm);
    this.setState(prevState => ({
      vehicles: prevState.vehicles.map(vehicle => {
        return vehicle.id === parseInt(id) ? editedVehicle : vehicle

      })
    }));
    this.props.history.push(`/vehicles/${id}`)

  }

  setEdit = async (vehicleData) => {
    // const vehicles = await readAllVehicles();
    const { title, image, genre, language } = vehicleData;
    this.setState({
      vehicleForm: {
        title,
        image,
        genre,
        language,
      }
    });
    this.props.history.push(`/vehicles/${vehicleData.id}`)
  }

  // resetForm = () => {
  //   this.setState({
  //     vehicleForm: {
  //       title: "",
  //       image: "",
  //       genre: "",
  //       language: ""
  //     }
  //   })
  // }

  //---//
  handleFlashcardFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      flashcardForm: {
        ...prevState.flashcardForm,
        [name]: value
      }
    }))
  }
  // editFlashcard = async () => {
  //   const { flashcardForm } = this.state
  //   await updateFlashcard(flashcardForm.id, flashcardForm);
  //   this.setState(prevState => (
  //     {
  //       flashcards: prevState.flashcards.map(flashcard => {
  //         return flashcard.id === flashcardForm.id ? flashcardForm : flashcard
  //       }),
  //     }
  //   ))
  // }
  // mountEditForm = async (id) => {
  //   const flashcards = await readAllFlashcards();
  //   const flashcard = flashcards.find(el => el.id === parseInt(id));
  //   this.setState({
  //     flashcardForm: flashcard,
  //   });
  // }

  // resetForm = () => {
  //   this.setState({
  //     flashcardForm: {
  //       vocab: "",
  //       vocab2: "",
  //       vocab3: "",
  //       description: ""
  //     }
  //   })
  // }



  handleCancelVehicleClick = (id) => { //returns undefined object
    this.setState((prevState) => ({ "vehicleForm": !prevState.vehicleForm }));
    this.props.history.push(`/vehicles/${id}`)


  }
  handleCancelFlashcardClick = () => {
    this.setState((prevState) => ({ "flashcardForm": !prevState.flashcardForm }));
  }


  /////// Delete ///////
  deleteVehicle = async (id) => {
    await destroyVehicle(id);
    this.setState(prevState => ({
      vehicles: prevState.vehicles.filter(vehicle => vehicle.id !== id)
    }))
  }

  deleteFlashcard = async (id) => {
    await destroyFlashcard(id);
    this.setState(prevState => ({
      flashcards: prevState.flashcards.filter(flashcard => flashcard.id !== id)
    }))
  }


  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser });
    this.props.history.push('/')
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
  }
  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }
  
  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App" >
        <Header
          handleLoginButton={this.handleLoginButton}
          handleLogout={this.handleLogout}
          currentUser={this.state.currentUser}
        />
        <Route exact path="/login" render={() => (
          <LoginForm
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <RegisterForm
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />

        <Route
          exact path="/"
          render={() => (
            <VehiclesView
              vehicles={this.state.vehicles}
              vehicleForm={this.state.vehicleForm}
              handleVehicleFormChange={this.handleVehicleFormChange}
              newVehicle={this.newVehicle} />
          )}
        />
        <Route
          path="/new/vehicle"
          render={() => (
            <CreateVehicle
              handleVehicleFormChange={this.handleVehicleFormChange}
              vehicleForm={this.state.vehicleForm}
              newVehicle={this.newVehicle}
              currentUser={this.state.currentUser}
              onCancel={this.handleCancelVehicleClick}
            />
          )} />
        <Route
          exact path="/vehicles/:id"
          render={(props) => {
            const { id } = props.match.params;
            const vehicle = this.state.vehicles.find(el => el.id === parseInt(id));
            return <VehiclePage
              id={id}
              vehicle={vehicle}
              setEdit={this.setEdit}
              currentUser={this.state.currentUser}

              // mountEditForm={this.mountEditForm}
              // handleVehicleFormChange={this.handleVehicleFormChange}

              // vehicleForm={this.state.vehicleForm}

              deleteVehicle={this.deleteVehicle}
              getFlashcards={this.getFlashcards}
              deleteFlashcard={this.deleteFlashcard}
            />
          }}
        />

        {/* edit vehicle */}
        <Route path="/vehicles/:id/edit" render={(props) => {
          const vehicleId = props.match.params.id;
          return <EditVehicle
            vehicleId={vehicleId}
            vehicleForm={this.state.vehicleForm}
            handleVehicleFormChange={this.handleVehicleFormChange}
            editSubmit={this.editSubmit}
            currentUser={this.state.currentUser}
            onCancel={this.handleCancelVehicleClick}

          />
        }} />



        <Route path='/vehicles/:id/flashcard/new' render={(props) => (
          <CreateFlashcard
            {...props}
            id={this.props.match.params.id}
            createFlashcard={this.createFlashcard}
            flashcards={this.state.flashcards}
            flashcardForm={this.state.flashcardForm}
            handleFlashcardFormChange={this.handleFlashcardFormChange}
            newFlashcard={this.newFlashcard}
            onCancel={this.handleCancelFlashcardClick}

          />
        )} />
        {this.state.flashcards &&
          <Route
            exact path="/vehicles/:id"
          render={(props) => (
        

              <FlashcardsView
              vehicleId={props.match.params.id.vehicleId}

                id={this.props.match.params.id}
                flashcards={this.state.flashcards}
                flashcardForm={this.state.flashcardForm}
                // handleVehicleFormChange={this.handleVehicleFormChange}
                newFlashcard={this.newFlashcard}
                deleteFlashcard={this.deleteFlashcard}

              />
            )}
          />}
        <footer>
          <div><Link to="https://github.com/PurpleTatsu/Lingo">
            <img id="white" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-5.png&r=255&g=255&b=255" />

          </Link>
            <a href="https://www.vecteezy.com/free-vector/blue-background">Blue Background Vectors by Vecteezy</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);