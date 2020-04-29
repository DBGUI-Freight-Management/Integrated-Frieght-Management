import React from "react"
import { ShippingApi } from "../API";
import { Link } from "react-router-dom"

export class TrackingPage extends React.Component{

    api = new ShippingApi();
    state={
        ships:[],
        companies:[],
        captains:[]
    }
    
    render(){
        if(!this.state.ships){
            return <div>Loading...</div>;
        }
        if(!this.state.ships.length){
            return <div className="alert alert-info">
                No ships found.
            </div>
        }
        return(
            <>
            <div className="container">
                <h1>Tracking Page</h1>
                    <div className="row rowHead">
                        <div className="col-4">Ship Name</div>
                        <div className="col-4">Location</div>
                        <div className="col-4">Status</div>
                    </div>
                    {this.state.ships.map(ship => (
                            <>
                            {ship.active===1 &&
                            <div key={ship.id} className="row">
                                <Link className="text-info col-4" to={`/freightmanager/shippage/${ship.id}`}>{ ship.name }</Link>
                                <div className="col-4">
                            <p>{ ship.statuses && ship.statuses[0] && ship.statuses[0].location}{(ship.statuses===undefined || ship.statuses.length===0) && "No Current Status"}</p>
                                </div>
                                <div className="col-4">
                            <p>{ship.statuses&& ship.statuses[0] && ship.statuses[0].status} {(ship.statuses===undefined || ship.statuses.length===0) && "No Current Location"}</p>
                                </div>
                            </div>
                            }
                            </>
                        ))}
                </div>
            </>
        )
    }

    componentDidMount(){
        this.api.getShips()
            .then(ships=>{
                this.setState({ships:ships});
                
                this.state.ships.forEach(ship=>{
                    this.api.getRecentStatuses(ship.id).then(y=>{
                        let shipArray = this.state.ships;
                        shipArray.find(x=>x.id===ship.id).statuses = y.reverse();
                        this.setState({ships:shipArray})
                    })
                })})
}}