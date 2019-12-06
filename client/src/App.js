import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import VehiclesView from './components/VehiclesView';
import VehiclePage from './components/VehiclePage';
import CreateVehicle from './components/CreateVehicle'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import FlashcardsView from './components/FlashcardsView'
import { createVehicle, readAllVehicles, updateVehicle, destroyVehicle, loginUser, registerUser, verifyUser } from './services/api-helper'
import { createFlashcard, readAllFlashcards } from './services/api-helper'

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
    this.getVehicles();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }

 


  /////// READ ///////
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


  /////// CREATE ///////
  // createTripList = async userId => {
  //   const newTriplist = await postTripList(userId, this.state.tripListFormData);
  //   this.setState(prevState => ({
  //     tripLists: [...prevState.tripLists, newTriplist]
  //   }));
  //   this.props.history.push("/");
  // };

  newVehicle = async userId => {
    const vehicle = await createVehicle(userId, this.state.vehicleForm);
    this.setState(prevState => ({
      vehicles: [...prevState.vehicles, vehicle]
    }));
    this.props.history.push("/");
  };

  newFlashcard = async (id,data) => {

    const flashcard = await createFlashcard(id,data);
    this.setState(prevState => ({
      flashcards: [...prevState.flashcards, flashcard]
    }));
    this.props.history.push(`/vehicles/${this.state.id}`); //returns undefined, fix later
  };

 

  /////// UPDATE ///////
  handleVehicleFormChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    this.setState(prevState => ({
      vehicleForm: {
        ...prevState.vehicleForm,
        [name]: value
      },
    }))
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

  mountEditForm = async (id) => {
    const vehicles = await readAllVehicles();
    const vehicle = vehicles.find(el => el.id === parseInt(id));
    this.setState({
      vehicleForm: vehicle,
    });
  }

  resetForm = () => {
    this.setState({
      vehicleForm: {
        title: "",
        image: "",
        genre: "",
        language: ""
      }
    })
  }
  handleCancelVehicleClick=()=>{
    this.setState((prevState) => ({ "vehicleForm": !prevState.vehicleForm }));
  }

  editVehicle = async () => {
    const { vehicleForm } = this.state
    await updateVehicle(vehicleForm.id, vehicleForm);
    this.setState(prevState => (
      {
        vehicles: prevState.vehicles.map(vehicle => {
          return vehicle.id === vehicleForm.id ? vehicleForm : vehicle
        }),
      }
    ))
  }

  /////// DELETE ///////
  deleteVehicle = async (id) => {
    await destroyVehicle(id);
    this.setState(prevState => ({
      vehicles: prevState.vehicles.filter(vehicle => vehicle.id !== id)
    }))
  }


  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser });
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
  }

  handleLogout = () => {
    localStorage.removeItem("authToken"); ///jwt?
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
          path="/vehicles/:id"
          render={(props) => {
            const { id } = props.match.params;
            const vehicle = this.state.vehicles.find(el => el.id === parseInt(id));
            return <VehiclePage
              id={id}
              vehicle={vehicle}
              handleVehicleFormChange={this.handleVehicleFormChange}
              mountEditForm={this.mountEditForm}
              editVehicle={this.editVehicle}
              vehicleForm={this.state.vehicleForm}
              deleteVehicle={this.deleteVehicle}
              // vehicleId={vehicleId}
              getFlashcards={this.getFlashcards}
            />
          }}
        />
         <Route path='/vehicles/:id/flashcard/new' render={(props) => (
          <CreateFlashcard
            {...props}
              id={this.props.match.params.id}
              createFlashcard={this.createFlashcard}
              flashcards={this.state.flashcards}
              flashcardForm={this.state.flashcardForm}
              handleFlashcardFormChange={this.handleFlashcardFormChange}
              newFlashcard={this.newFlashcard}
            />
        )} />
        {this.state.flashcards &&
          <Route
            exact path="/vehicles/:id"
            render={(props) => (
              <FlashcardsView
                id={this.props.match.params.id}
                flashcards={this.state.flashcards}
                flashcardForm={this.state.flashcardForm}
                handleVehicleFormChange={this.handleVehicleFormChange}
                newFlashcard={this.newFlashcard}
              />
            )}
          />}
      </div>
    );
  }
}

export default withRouter(App);