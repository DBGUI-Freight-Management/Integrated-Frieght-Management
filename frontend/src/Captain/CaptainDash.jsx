import React from "react"
import {NavButton} from"./NavButton"
import { CaptainLogView } from "./CaptainLogView"

import { CrewList, CaptainCompanySelection } from "../ShippingManager";
import { CargoList } from "../ShippingManager/CargoList";
import { StatusPage } from "./StatusPage";
import { CaptainRouteInfo } from "./CaptainRouteInfo";
import { ShippingApi } from "../API";
import { UpdateCaptainInfo } from "./UpdateCaptainInfo";
import {Link} from 'react-router-dom';

const api = new ShippingApi();

export class CaptainDash extends React.Component{

    state={
        route:undefined
    }
    
    componentDidMount(){
        
        api.getSessionRoute().then(x=>{
            if(x.length===0){
                this.setState({route:undefined})
            }  else {
                this.setState({route:x[0]});
            }
        });
    }

    render(){
        

            return (
            <>
                {this.state.route !== undefined && <div className="container">
                    <h2>Captain View</h2>
                    <Link className="btn btn-secondary float-right" to='/login'> Logout</Link>
                    <ul className="list-group list-group-horizontal border-bottom mb-2">
                        <NavButton mode={this.props.mode} link="route" text="Current Route"/>
                        <NavButton mode={this.props.mode} link="logs" text="Ship Logs"/>
                        <NavButton mode={this.props.mode} link="status" text="Status"/>
                        <NavButton mode={this.props.mode} link="crew" text="Crew"/> 
                        <NavButton mode={this.props.mode} link="cargo" text="Cargo"/>
                        <NavButton mode={this.props.mode} link ="updateInfo" text="UpdateInfo"/>
                    </ul>
                    {this.props.mode === 'logs' && <CaptainLogView/> }
                    {this.props.mode ==='status' && <StatusPage/>}
                    {this.props.mode === 'crew' && <CrewList/>}
                    {this.props.mode === 'cargo' && <CargoList/>}
                    {this.props.mode === 'route' && <CaptainRouteInfo/>}
                    {this.props.mode === 'updateInfo' && <UpdateCaptainInfo/>}
                </div>}
                {this.state.route === undefined && <div className="container">
                        <h2>Captain View</h2>
                        <Link className="btn btn-secondary float-right" to='/login'> Logout</Link>
                        <ul className="list-group list-group-horizontal border-bottom mb-2">
                            <NavButton mode={this.props.mode} link="route" text="Current Route"/>
                            <NavButton mode={this.props.mode} link ="updateInfo" text="UpdateInfo"/>
                        </ul>
                        {this.props.mode === 'route' && <CaptainRouteInfo/>}
                        {this.props.mode === 'updateInfo' && <UpdateCaptainInfo/>}
                    </div>
                }
            </>)
        }
    
}