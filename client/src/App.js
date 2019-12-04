import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import VehiclesView from './components/VehiclesView';
import VehiclePage from './components/VehiclePage';
import CreateVehicle from './components/CreateVehicle'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import { createVehicle, createFlashcard, readAllVehicles, updateVehicle, destroyVehicle, loginUser, registerUser, verifyUser } from './services/api-helper'
import './App.css';


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


  /////// CREATE ///////
  // createTripList = async userId => {
  //   const newTriplist = await postTripList(userId, this.state.tripListFormData);
  //   this.setState(prevState => ({
  //     tripLists: [...prevState.tripLists, newTriplist]
  //   }));
  //   this.props.history.push("/");
  // };

  newVehicle = async userId => {
    const flashcard = await createVehicle(userId, this.state.vehicleForm);
    this.setState(prevState => ({
      vehicles: [...prevState.vehicles, flashcard]
    }));
    this.props.history.push("/");
  };

  // newVehicle = async () => {
  //   debugger;
  //   const flashcard = await createVehicle(this.state.vehicleForm);
  //   this.setState(prevState => ({
  //     vehicles: [...prevState.vehicles, flashcard],
  //     vehicleForm: {
  //       title: "",
  //       image: "",
  //       genre: "",
  //       language: ""
  //     }
  //   }))
  // }

  /////// UPDATE ///////
  handleFormChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    this.setState(prevState => ({
      vehicleForm: {
        ...prevState.vehicleForm,
        [name]: value
      }
    }))
  }

  mountEditForm = async (id) => {
    const vehicles = await readAllVehicles();
    const flashcard = vehicles.find(el => el.id === parseInt(id));
    this.setState({
      vehicleForm: flashcard
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

  editVehicle = async () => {
    const { vehicleForm } = this.state
    await updateVehicle(vehicleForm.id, vehicleForm);
    this.setState(prevState => (
      {
        vehicles: prevState.vehicles.map(flashcard => {
          return flashcard.id === vehicleForm.id ? vehicleForm : flashcard
        }),
      }
    ))
  }

  /////// DELETE ///////
  deleteVehicle = async (id) => {
    await destroyVehicle(id);
    this.setState(prevState => ({
      vehicles: prevState.vehicles.filter(flashcard => flashcard.id !== id)
    }))
  }

// create Flashcard
  newFlashcard = async userId => {
    const flashcard = await createFlashcard(userId, this.state.flashcardForm);
    this.setState(prevState => ({
      flashcards: [...prevState.flashcards, flashcard]
    }));
    this.props.history.push("/");
  };
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
  //-------------------//

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
              handleFormChange={this.handleFormChange}
              newVehicle={this.newVehicle} />
          )}
        />
        <Route
          path="/new/flashcard"
          render={() => (
            <CreateVehicle
              handleFormChange={this.handleFormChange}
              vehicleForm={this.state.vehicleForm}
              newVehicle={this.newVehicle}
              currentUser={this.state.currentUser}
            />
          )} />
        <Route
          path="/vehicles/:id"
          render={(props) => {
            const { id } = props.match.params;
            const flashcard = this.state.vehicles.find(el => el.id === parseInt(id));
            return <VehiclePage
              id={id}
              flashcard={flashcard}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editVehicle={this.editVehicle}
              vehicleForm={this.state.vehicleForm}
              deleteVehicle={this.deleteVehicle}
              // flashcardForm={this.state.flashcardForm}
              // newFlashcard={this.newFlashcard}
              currentUser={this.state.currentUser}/>
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);