import React from "react"
import {ShippingApi} from "../API"
import {ShipCreationForm} from "./ShipCreationForm"

export class ShipList extends React.Component{
    
    api = new ShippingApi();
    state={
        ships:[]
    }

    deleteShip(id){
        this.api.deleteShip(id)
            .then(()=>{
                this.setState({
                    ships: this.state.ships.filter(x => x.id !== id)
                })
                alert("Ship Deleted");
            });
    }

    addShip(name, companyID){
        this.api.addShip(name, companyID)
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
                            <div key={ship.id} className="row">
                                <div className="col-4">{ ship.name }</div>
                                <div className="col-8">
                                    <button type="button" className="btn btn-danger float-right mt-1" onClick={()=>this.deleteShip(ship.id)}>
                                        Delete Ship
                                    </button>
                                    <p>{ ship.companyName }</p>
                                    <p>{ (ship.status && ship.status.status) && ship.status.status}
                                    {!ship.status && ("No Current Status")}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <ShipCreationForm onSubmit={(name, companyID)=>this.addShip(name, companyID)}/>
            </>
        )
    }
    componentDidMount(){
        this.api.getShips()
            .then(ships => {
                this.setState({ships})
                ships.forEach(ship=>{
                    let shipArray = this.state.ships;
                    this.api.getRecentStatuses(ship.id).then(x=>{
                        if(shipArray){
                            shipArray.find(x=>ship.id === x.id).status=x[0];
                            this.setState({ships:shipArray})
                            }
                        })
                    
                })
            }
            );
    }
};

