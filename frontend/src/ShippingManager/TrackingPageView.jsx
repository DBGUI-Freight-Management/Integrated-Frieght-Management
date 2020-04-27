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
                            <div key={ship.id} className="row">
                                <Link className="col-4" to={`/freightmanager/shippage/${ship.id}`}>{ ship.name }</Link>
                                <div className="col-4">
                                    <p>{ ship.logs && ship.logs[0].location}</p>
                                </div>
                                <div className="col-4">
                                    <p>{ship.statuses&& ship.statuses[0].status}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </>
        )
    }

    componentDidMount(){
        this.api.getShips()
            .then(ships=>{
                this.setState({ships:ships});
                console.log(this.state);
                ships.forEach((ship,index)=>{
                    this.api.getRecentLogs(ship.id).then(y=>{
                            let shipArray = this.state.ships;
                            shipArray[index].logs = y;
                            this.setState({ships:shipArray})
                    })
                    this.api.getRecentStatuses(ship.id).then(y=>{
                        let shipArray = this.state.ships;
                        shipArray[index].statuses = y;
                        this.setState({ships:shipArray})
                    })
                })})
}}