import React from 'react'
import { ShippingApi } from '../API'
import { Link } from "react-router-dom"

export class ShipPage extends React.Component {
    api = new ShippingApi();
    state = {
        ship: [],
        crew: [],
        cargo: []
    }

    parseDate(mysqlDate){
        var dateParts = mysqlDate.split("-");
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    }

    render() {
        if (!this.state.ship) {
            return <div>Loading...</div>;
        }
        return (
            <div className="container">
                <h1 className="mt-2">{this.state.ship[0] && this.state.ship[0].name} Info</h1>
                <h5>Captain: {this.state.ship[0] && this.state.ship[0].firstName + " " + this.state.ship[0].lastName}</h5>
                
                <h5>Destination: {this.state.ship[0] && this.state.ship[0].destination}</h5>
                <h5>Crew:  {this.state.crew && this.state.crew.length === 0 && "No current Crew"}</h5>
                <ul className="list-group">
                   
                    {this.state.crew.map((crew, index) => 
                        <li className="list-group-item" key={index}>
                            <p>Name: {crew.fname + " " + crew.lname}</p>
                            <p>Date Boarded: {crew.dateBoarded && `${this.parseDate(crew.dateBoarded).getMonth()+"/"+this.parseDate(crew.dateBoarded).getDay() + "/" + this.parseDate(crew.dateBoarded).getFullYear()}`} {!crew.dateBoarded && "Not Listed"}</p>
                            <p>Position: {crew.role}</p>
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
                <Link className="btn btn-primary mb-2 float-right" to="/dashboard/freightmanager/trackingpage">Back to Tracking Page</Link>
            </div>
        )
    }

    componentDidMount() {
        let shipID = +this.props.match.params.shipID;
        debugger;
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