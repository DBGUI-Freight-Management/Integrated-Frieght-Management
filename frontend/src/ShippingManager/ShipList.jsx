import React from "react"
import {ShippingApi} from "../API"

export class ShipList extends React.Component{

    api = new ShippingApi();
    state={
        ships:[]
    }
    render(){
        if(!this.state.ships.length){
            return <div>Loading...</div>;
        }
        return(
            <>
                <div className="container">
                    <h1>
                        Ships List
                    </h1>
                    <div className="row rowHead">
                        <div className="col-4">Ship Name</div>
                        <div className="col-8">Ship Status</div>
                    </div>
                    {this.state.ships.map(ship => (
                            <div className="row">
                                <div className="col-4">{ ship.name }</div>
                                <div className="col-8">
                                    <p>{ ship.owningCompany }</p>
                                    <p>{ ship.status} </p>
                                </div>
                            </div>
                        ))}
                </div>
            </>
        )
    }
    componentDidMount(){
        this.api.getShips()
            .then(ships => this.setState({ships}));
    }
};

