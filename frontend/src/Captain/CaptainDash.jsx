import React from "react"
import {NavButton} from"./NavButton"
import { CaptainLogView } from "./CaptainLogView"

import { CrewList, CaptainCompanySelection } from "../ShippingManager";
import { CargoList } from "../ShippingManager/CargoList";
import { StatusPage } from "./StatusPage";
import { CaptainRouteInfo } from "./CaptainRouteInfo";

export class CaptainDash extends React.Component{
    addCrewMember(member){
        let crew = this.state.crew;
        crew.push(member);
        this.setState({crew})
    }

    addCargo(cargo){
        let cargoList = this.state.cargo;
        cargoList.push(cargo);
        this.setState({cargo:cargoList});
    }

    addStatus(status){
        let statusList=this.state.status;
        statusList.push(status);
        this.setState({status:statusList});
    }

    render(){
        return (
            <>
                <div className="container">
                    <h2>Captain View</h2>
                    <ul className="list-group list-group-horizontal border-bottom mb-2">
                        <NavButton mode={this.props.mode} link="route" text="Current Route"/>
                        <NavButton mode={this.props.mode} link="logs" text="Ship Logs"/>
                        <NavButton mode={this.props.mode} link="status" text="Status"/>
                        <NavButton mode={this.props.mode} link="crew" text="Crew"/> 
                        <NavButton mode={this.props.mode} link="cargo" text="Cargo"/>
                    </ul>
                    {this.props.mode === 'logs' && <CaptainLogView/> }
                    {this.props.mode ==='status' && <StatusPage/>}
                    {this.props.mode === 'crew' && <CrewList/>}
                    {this.props.mode === 'cargo' && <CargoList/>}
                    {this.props.mode === 'route' && <CaptainRouteInfo/>}
                </div>
                
                
            </> 
        )
    }
}