import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
import SideBar from "./components/Sidebar";

import TvShows from './components/TvShows';
import Books from './components/Books';
import Movies from './components/Movies';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      vehicleForm: {
        title: "",
        image: "",
        genre: "",
        language: "",
        category: ""
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
      authError: null
    };
    this.baseState = this.state
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


  resetForm = () => {
    this.setState(this.baseState)
  }


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
    this.props.history.push(`/vehicles/${id}`);
  };


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
    const editedVehicle = await updateVehicle(id, this.state.vehicleForm);
    this.setState(prevState => ({
      vehicles: prevState.vehicles.map(vehicle => {
        return vehicle.id === parseInt(id) ? editedVehicle : vehicle

      })
    }));
    this.props.history.push(`/vehicles/${id}`)
  }

  setEdit = async (id) => {
    const vehicle = await this.state.vehicles.find(vehicle => vehicle.id === parseInt(id))

    const { title, image, genre, language, category } = vehicle;
    this.setState({
      vehicleForm: {
        title,
        image,
        genre,
        language,
        category,
      }
    });
  }



  handleFlashcardFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      flashcardForm: {
        ...prevState.flashcardForm,
        [name]: value
      }
    }))
  }


  // handleCancelVehicleClick = (id) => { //returns undefined object
  //   this.setState((prevState) => ({ "vehicleForm": !prevState.vehicleForm }));
  //   this.props.history.push(`/vehicles/${id}`)


  // }
  // handleCancelFlashcardClick = () => {
  //   this.setState((prevState) => ({ "flashcardForm": !prevState.flashcardForm }));
  // }


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
    if (currentUser.error) {
      this.setState({
        authError: currentUser.error
      })
    } else {
      this.setState({ currentUser });
      this.props.history.push('/')
    }
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    if (currentUser.error) {
      this.setState({
        authError: currentUser.error
      })
    } else {
      this.setState({ currentUser });
    }
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
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App-sidebar"} />



        <Header
          handleLoginButton={this.handleLoginButton}
          handleLogout={this.handleLogout}
          currentUser={this.state.currentUser}
        />
        <Route exact path="/login" render={() => (
          <LoginForm
            authError={this.state.authError}
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <RegisterForm
            authError={this.state.authError}
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
              resetForm={this.resetForm}
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
              deleteVehicle={this.deleteVehicle}
              getFlashcards={this.getFlashcards}
              deleteFlashcard={this.deleteFlashcard}
            />
          }}
        />

        <Route path="/vehicles/:id/edit" render={(props) => {
          const vehicleId = props.match.params.id;
          return <EditVehicle
            vehicleId={vehicleId}

            vehicleForm={this.state.vehicleForm}
            handleVehicleFormChange={this.handleVehicleFormChange}
            editSubmit={this.editSubmit}
            currentUser={this.state.currentUser}
            resetForm={this.resetForm}

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
            resetForm={this.resetForm}

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
                newFlashcard={this.newFlashcard}
                deleteFlashcard={this.deleteFlashcard}

              />
            )}
          />}

        {/* filtered views */}

        <Route exact path="/tv-shows" render={() => (
          <TvShows
            vehicles={this.state.vehicles}
          />
        )} />

        <Route exact path="/books" render={() => (
          <Books
            vehicles={this.state.vehicles}
          />
        )} />

        <Route exact path="/movies" render={() => (
          <Movies
            vehicles={this.state.vehicles}
          />
        )} />


        <footer>


          <div>
            <div>
              <img className="thanks" src="https://i.pinimg.com/originals/71/c0/68/71c068478e7499d73ec005eacbe42c10.gif"
                onClick={() => {
                  console.log("Kahil && Svetla && Brian && David && Shay")
                }} />
            </div>

            <div>
              <a href="https://github.com/PurpleTatsu/Lingo" target="_blank" >
                <img id="white" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-github-5.png&r=255&g=255&b=255" alt="github" /> </a>
              <p>© 2019 Katie Gray</p>
            </div>
          </div>
          <a href="https://www.vecteezy.com/free-vector/blue-background">Blue Background Vectors by Vecteezy</a>



        </footer>
      </div>
    );
  }
}

export default withRouter(App);