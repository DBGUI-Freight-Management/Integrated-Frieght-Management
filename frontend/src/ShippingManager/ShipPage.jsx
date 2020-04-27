import React from 'react'
import { ShippingApi } from '../API'

export class ShipPage extends React.Component {
    api = new ShippingApi();
    state = {
        ship: [],
        crew: [],
        cargo: []
    }

    render() {
        if (!this.state.ship) {
            return <div>Loading...</div>;
        }
        return (
            <div className="container">
                <h1>{this.state.ship.shipName} Info</h1>
                <h5>Captain: {this.state.ship.captainName}</h5>
                <h5>Company: {this.state.ship.companyName}</h5>
                <h5>Destination: {this.state.ship.destination}</h5>
                <h5>Crew: </h5>
                <ul className="list-group">
                    {this.state.crew.map((crew, index) => 
                        <li className="list-group-item" key={index}>
                            <p>Name: {crew.firstName} {crew.lastName}</p>
                            <p>Date Boarded: {crew.dateBoarded}</p>
                            <p>Position: {crew.position}</p>
                        </li>
                    )}
                </ul>
                <h5>Cargo: </h5>
                <ul className="list-group">
                    {this.state.cargo.map((item, index)=>
                        <li className="list-group-item" key={index}>
                            <p>Name: {item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        let shipID = +this.props.match.params.shipID;
        if (shipID) {
            this.api.getShipByID(shipID)
                .then(ship => this.setState({ ship })
                );
            this.api.getCrewByShipID(shipID)
                .then(crew => this.setState({ crew })
                );
            this.api.getCargoByID(shipID)
                .then(cargo => this.setState({cargo})
                );
        }
    }
}