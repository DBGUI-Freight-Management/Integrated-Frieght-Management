import React from 'react';
import { ShippingApi } from '../API';

export class CaptainRouteInfo extends React.Component{

    api = new ShippingApi();
    state={
        route:undefined,
        routeCompleted:false
    }

    componentDidMount(){
        this.api.getSessionRoute()
            .then(routes=>{
                
                this.setState({route:routes[0]});

                }
            )
    }


    parseDate(mysqlDate){
        var dateParts = mysqlDate.split("-");
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    }

    completeRoute(){
        this.api.completeSessionRoute().then(this.setState({route:undefined,routeCompleted:true}));
    }

    render(){
        return(
            <div className="container">
                {this.state.route && (
                    <>
                        <h2>Destination: {this.state.route.destination}</h2>
                        <h3>Estimated Arrival: {this.state.route.endDate.substring(5,7)+"/" + this.state.route.endDate.substring(8,10)+"/"+this.state.route.endDate.substring(0,4)}</h3>
                        <h2>Current Location: {this.state.route.currentLocation}</h2>
                        <h2>Start Location: {this.state.route.start}</h2>
                        <h3>Start Date : {this.state.route.startDate.substring(5,7)+"/" + this.state.route.startDate.substring(8,10)+"/"+this.state.route.startDate.substring(0,4)}</h3>
                        <button type="btn" className="btn btn-primary" onClick={e=>this.completeRoute()}>Submit Route</button>
                    </>
                )}
                {!this.state.route &&(
                    <h2>No Current Route</h2>
                )}
            </div>
        )
    }

}