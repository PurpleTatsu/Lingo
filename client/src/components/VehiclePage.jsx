import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { verifyUser } from '../services/api-helper'



class VehiclesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      flashcards: [],
      currentVehicle: null,
    }

  }

  async componentDidMount() {
    await this.props.getFlashcards(this.props.id)
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }


  render() {
    const { currentUser } = this.props;
    const { vehicle } = this.props;
    return (
      <div className="page-topper">

        <div className="vehicle-page">

          {
            vehicle === undefined ? <h2>Loading . . .</h2> : (
              <>

                <div className="vehicle-hero">
                  <img alt={vehicle.title} src={vehicle.image} />
                  <div className="vehicle-info">
                    <h3>{vehicle.genre}</h3>
                    <h3>{vehicle.language}</h3>
                    <h3>{vehicle.category}</h3>
                    <h1>{vehicle.title}</h1>

                    {
                      currentUser && currentUser.id === vehicle.user_id && (
                        <>
                          {/* <button onClick={() => {
                            this.props.deleteVehicle(vehicle.id);
                            this.props.history.push(`/`)
                          }}>Delete</button> */}

                          <button onClick={() => {
                            
                            this.props.setEdit(vehicle.id);
                            this.props.history.push(`/vehicles/${vehicle.id}/edit`)
                          }}>Edit</button>
                        </>
                      )
                    }

                  </div>
                </div>

              </>
            )
          }
          {
            <>
              <div className="add-flashcard">
                <button className="add-flashcard-button"
                  onClick={() => {
                    this.props.history.push(`/vehicles/${this.props.id}/flashcard/new`);
                  }}>Add flashcard</button>
              </div>
            </>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(VehiclesPage);