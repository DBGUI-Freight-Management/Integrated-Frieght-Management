import React from "react"
import { ShippingCompanyCreationForm } from "./ShippingCompanyCreationForm"

import { ShipList } from "./ShipList"
import { ShippingManager, Ship} from "./models"

import { ActiveShipsView } from "./ActiveShipsView"
import { TrackingPage } from "./TrackingPageView"
import { UpdateShipStatus } from "./UpdateShipStatus"
import { NavButton } from "../Captain/NavButton"


export class ShippingManagerPage extends React.Component{
    state={
        manager: new ShippingManager(),
        selectedCaptain: 0,
        selectedMessage: undefined
    }

    updateShipStatus(name, company, status) {
        let mgr = this.state.manager;
        mgr.updateShipStatus(name, company, status);
        this.setState(({ manager: mgr }));
    }

    changeCaptainCompany(company){
        let mgr=this.state.manager;
        mgr.changeCaptainCompany(mgr.captains[this.state.selectedCaptain],company);
        this.setState({manager:mgr});
        console.log(this.state);
    }
    addLogMessage(input){
        let mgr=this.state.manager;
        console.log(input);
        let message={captain:mgr.captains[this.state.selectedCaptain],
                    date:input.date,
                    header:input.logHeader,
                    message:input.logMessage}
        mgr.addLogMessage(message);
        this.setState({manager:mgr});
    }

    selectMessage(message){
        this.setState({selectedMessage:this.state.manager.messages.findIndex(m=> m=== message)});
    }

    render() {
        return (
            <>
                <div className="container">
                    <h2>Freight Manager View</h2>
                    <ul className="list-group list-group-horizontal border-bottom mb-2">
                        <NavButton mode={this.props.mode} link="companycreation" text="Shipping Company Creation"/>
                        <NavButton mode={this.props.mode} link="trackingpage" text="Tracking Page"/>
                        <NavButton mode={this.props.mode} link="shiplist" text="Ship List"/>
                        <NavButton mode={this.props.mode} link="activeships" text="Active Ships"/>
                        <NavButton mode={this.props.mode} link="updateshipstatus" text="Update Ship Status"/>
                    </ul>
                {this.props.mode==="companycreation" && (<ShippingCompanyCreationForm />)}
                {this.props.mode==="trackingpage" && (<TrackingPage />)}
                {this.props.mode==="shiplist" && (<ShipList />)}
                {this.props.mode==="activeships" && (<ActiveShipsView />)}
                {this.props.mode==="updateshipstatus" && (<UpdateShipStatus />)}
                </div> 
            </>
        )
    }
}