import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// import VehiclesView from './components/VehiclesView';
// import VehiclePage from './components/VehiclePage';
// import CreateVehicle from './components/CreateVehicle'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import Header from './components/Header'
import {
  // createVehicle,
  // readAllVehicles,
  // updateVehicle,
  // destroyVehicle,
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'

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
        password: ""
      }
    };
  }

  // async componentDidMount() {
  //   this.getVehicles();
  //   const currentUser = await verifyUser();
  //   if (currentUser) {
  //     this.setState({ currentUser })
  //   }
  // }

  // getVehicles = async () => {
  //   const vehicles = await readAllVehicles();
  //   this.setState({
  //     vehicles
  //   })
  // }

  // newVehicle = async (e) => {
  //   e.preventDefault();
  //   const vehicle = await createVehicle(this.state.vehicleForm);
  //   this.setState(prevState => ({
  //     vehicles: [...prevState.vehicles, vehicle],
  //     vehicleForm: {
  //       name: "",
  //       photo: ""
  //     }
  //   }))
  // }

  // editVehicle = async () => {
  //   const { vehicleForm } = this.state
  //   await updateVehicle(vehicleForm.id, vehicleForm);
  //   this.setState(prevState => (
  //     {
  //       vehicles: prevState.vehicles.map(vehicle => {
  //         return vehicle.id === vehicleForm.id ? vehicleForm : vehicle
  //       }),
  //     }
  //   ))
  // }

  // deleteVehicle = async (id) => {
  //   await destroyVehicle(id);
  //   this.setState(prevState => ({
  //     vehicles: prevState.vehicles.filter(vehicle => vehicle.id !== id)
  //   }))
  // }

  // handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState(prevState => ({
  //     vehicleForm: {
  //       ...prevState.vehicleForm,
  //       [name]: value
  //     }
  //   }))
  // }

  // mountEditForm = async (id) => {
  //   const vehicles = await readAllVehicles();
  //   const vehicle = vehicles.find(el => el.id === parseInt(id));
  //   this.setState({
  //     vehicleForm: vehicle
  //   });
  // }

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
        {/* <Route
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
          path="/new/vehicle"
          render={() => (
            <CreateVehicle
              handleFormChange={this.handleFormChange}
              vehicleForm={this.state.vehicleForm}
              newVehicle={this.newVehicle} />
          )} />
        <Route
          path="/vehicles/:id"
          render={(props) => {
            const { id } = props.match.params;
            const vehicle = this.state.vehicles.find(el => el.id === parseInt(id));
            return <VehiclePage
              id={id}
              vehicle={vehicle}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editVehicle={this.editVehicle}
              vehicleForm={this.state.vehicleForm}
              deleteVehicle={this.deleteVehicle} />
          }}
        /> */}
      </div>
    );
  }
}

export default withRouter(App);