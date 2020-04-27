import React from "react"
import {ShippingApi} from "../API"
import {ShipCreationForm} from "./ShipCreationForm"

export class ShipList extends React.Component{

    //TODO:
    //change from model attributes to api attributes for ship
    
    api = new ShippingApi();
    state={
        ships:[]
    }

    deleteShip(ship){
        this.api.deleteShip(ship)
            .then(()=>{
                this.setState({
                    ships: this.state.ships.filter(x => x.id !== ship.id)
                })
                alert("Ship Deleted");
            });
    }

    addShip(ship){
        this.api.addShip(ship)
            .then(ship=>{
                this.state.ships.push(ship);
                alert("Ship Added!");
                this.setState({ship});
            });
    }

    render(){
        
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
                                    <button type="button" className="btn btn-danger" onClick={()=>this.deleteShip(ship)}>
                                        Delete Ship
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <ShipCreationForm onSubmit={ship=>this.addShip(ship)}/>
            </>
        )
    }
    componentDidMount(){
        this.api.getShips()
            .then(ships => {
                console.log(ships);
                ships.forEach(ship=>{

                })
            }
            );
    }
};

