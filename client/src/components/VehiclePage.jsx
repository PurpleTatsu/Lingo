import React, { Component } from 'react';
import EditVehicle from './EditVehicle'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class VehiclesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { vehicle } = this.props;
    return (
      <div>
        {vehicle === undefined ? <h2>Loading . . .</h2> : (
          <div className="vehicle-page">
            <img alt={vehicle.title} src={vehicle.image} />
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
      </div>)
  }
}

export default withRouter(VehiclesPage);