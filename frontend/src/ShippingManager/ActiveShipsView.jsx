import React from "react"
import { ShippingApi } from "../API"

export class ActiveShipsView extends React.Component{
    api = new ShippingApi();
    state={
        activeships:[]
    }
    render(){
        return(
            <>
                <form className="container">
                    <h1>Active Ships Log</h1>
                    <div className="row rowHead">
                        <div className="col-4">Ship Name</div>
                        <div className="col-4">Captain</div>
                        <div className="col-4">Destination</div>
                    </div>
                    {this.state.activeships.map(ship => (
                        <div className="row" key={ship.id}>
                        <div className="col-4">{ ship.name }</div>
                        <div className="col-4">
                            <p>{ship.firstName + " " + ship.lastName}</p>
                        </div>
                        <div className="col-4">
                            <p>{ship.destination}</p>
                        </div>
                        </div>
                    ))}
                </form>
            </>
        )    
    }
    componentDidMount(){
        this.api.getActiveShips()
            .then(activeships=>this.setState({activeships}))
    }
}
