import React from 'react';
import { ShippingApi } from '../API';

export class CaptainRouteInfo extends React.Component{

    api = new ShippingApi();
    state={
        route:undefined
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

    render(){
        return(
            <div className="container">
                {this.state.route && (
                    <>
                        <h2>Destination: {this.state.route.destination}</h2>
                        <h3>Estimated Arrival: {this.parseDate(this.state.route.endDate).getMonth()}/{this.parseDate(this.state.route.endDate).getDay()}/{this.parseDate(this.state.route.endDate).getFullYear()}</h3>
                        <h2>Current Location: {this.state.route.currentLocation}</h2>
                        <h2>Start Location: {this.state.route.start}</h2>
                        <h3>Start Date : {this.parseDate(this.state.route.startDate).getMonth()}/{this.parseDate(this.state.route.startDate).getDay()}/{this.parseDate(this.state.route.startDate).getFullYear()}</h3>
                    </>
                )}
            </div>
        )
    }

}