import React from 'react'
import { ShippingApi } from '../API'

export class CreateRouteForm extends React.Component{
    api = new ShippingApi();
    state={
        ships:[],
        captains: [],
        selectedShip: "",
        selectedCaptain: "",
        startLoc: "",
        endLoc: "",
        endDate: ""
    }

    sumbit(){
        this.api.addRoute(this.state.selectedShip.id, this.state.selectedCaptain.captainID, this.state.endLoc, this.state.startLoc, this.state.endDate)
            .then(()=>this.setState({selectedShip: "", selectedCaptain: "", startLoc: "", endLoc: "", endDate: ""}));
    }

    render(){
        return(
            <form className="container">
                <h1>
                    Create Route
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
                        {this.state.ships.map(ship => (<option value={ship.shipid}>{ship.name}</option>))}
                    </select>
                </div>
                {this.state.selectedShip && ( <>
                    <div className="form-group">
                    <label htmlFor="shipCaptain">
                        Route Captain:
                        </label>
                    <select className="form-control"
                        id="shipCaptain"
                        name="shipCaptain"
                        value={this.state.selectedCaptain}
                        onChange={e => this.setState({ selectedCaptain: e.target.value })}>
                        <option></option>
                        {this.state.captains.map(captain => (<option value={captain.captainID} >{captain.firstName + " " +captain.lastName}</option>))}
                    </select>
                    </div>
                        <div className = "form-group" >
                            <label htmlFor="startLoc">
                                Route Start Location:
                            </label>
                            <input type="text"
                                id="startLoc"
                                name="startLoc"
                                className="form-control"
                                value={this.state.startLoc}
                                onChange={e => this.setState({ startLoc: e.target.value })} />
                        </div>
                        <div className = "form-group" >
                            <label htmlFor="endLoc">
                                Route Destination:
                            </label>
                            <input type="text"
                                id="endLoc"
                                name="endLoc"
                                className="form-control"
                                value={this.state.endLoc}
                                onChange={e => this.setState({ endLoc: e.target.value })} />
                        </div>
                        <div className = "form-group" >
                            <label htmlFor="endDate">
                                Expected End Date:
                            </label>
                            <input type="text"
                                id="endDate"
                                name="endDate"
                                className="form-control"
                                value={this.state.endDate}
                                onChange={e => this.setState({ endDate: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary mb-2" onClick={() => this.submit()}>Create Route</button>
                        </div>
                    </>
                )}
            </form>
        )
    }

    componentDidMount(){
        this.api.getShipRoutes()
            .then(ships=>{
                let result = ships.filter(ship=>ship.id===null);
                this.setState({ships:result})
            }
            );
        this.api.getCaptainRoutes()
            .then(captains=>{
                let result = captains.filter(captain=>captain.id===null);
                this.setState({captains:result})}
            );
    }
}