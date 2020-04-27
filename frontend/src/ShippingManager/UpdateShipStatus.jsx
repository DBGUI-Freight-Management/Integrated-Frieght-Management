import React from 'react';
import { ShippingApi } from '../API';

export class UpdateShipStatus extends React.Component {

    api = new ShippingApi();
    state = {
        ships: [],
        selectedShip: "",
        newStatus: "",
        newLoc: "",
        route: []
    }

    submit() {
        this.api.updateShipStatus(this.state.newStatus, this.state.route.tripID, this.state.newLoc);
        this.setState({ selectedShip: "", newStatus: "", newLoc: ""});
    }

    render() {
        return (
            <form className="container">
                <h1>
                    Update a Ship's Status
                    </h1>
                <div className="form-group">
                    <label htmlFor="shipName">
                        Select Ship:
                        </label>
                    <select className="form-control"
                        id="shipName"
                        name="shipName"
                        value={this.state.selectedShip}
                        onChange={e => this.setState({ selectedShip: e.target.value })}>
                        <option></option>
                        {this.state.ships.map(ship => (<option>{ship.shipName}</option>))}
                    </select>
                </div>
                {this.state.selectedShip && ( <>
                    <div className = "form-group" >
                        <label htmlFor="shipStatus">
                            New Ship Status:
                        </label>
                        <input type="text"
                            id="shipStatus"
                            name="shipStatus"
                            className="form-control"
                            value={this.state.newStatus}
                            onChange={e => this.setState({ newStatus: e.target.value })} />
                    </div>
                    <div className = "form-group" >
                        <label htmlFor="shipLoc">
                            New Ship Location:
                        </label>
                        <input type="text"
                            id="shipLoc"
                            name="shipLoc"
                            className="form-control"
                            value={this.state.newLoc}
                            onChange={e => this.setState({ newLoc: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary mb-2" onClick={() => this.submit()}>Update Status</button>
                    </div>
                    </>
                )}
            </form>
        )
    }

    componentDidMount() {
        this.api.getShips()
            .then(ships => this.setState({ ships })
            );
    }

    componentDidUpdate(){
        this.api.getRouteByShipID(this.state.selectedShip.shipID)
            .then(route => this.setState({route})
            );
    }
}