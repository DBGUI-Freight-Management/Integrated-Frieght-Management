import React from "react"
import { ShippingCompanyCreationForm } from "./ShippingCompanyCreationForm"
import { ShipCreationForm } from "./ShipCreationForm"
import { ShipList } from "./ShipList"
import { ShippingManager, Ship} from "./models"
import { CaptainCompanySelection } from "./CaptainCompanySelection"
import { ActiveShipsView } from "./ActiveShipsView"
import { TrackingPage } from "./TrackingPageView"
import { UpdateShipStatus } from "./UpdateShipStatus"
import { NavButton } from "../Captain/NavButton"
import { ShipDeletionForm } from "./ShipDeletionForm"

export class ShippingManagerPage extends React.Component{
    state={
        manager: new ShippingManager(),
        selectedCaptain: 0,
        selectedMessage: undefined
    }

    // addCompany(company){
    //     let mgr = this.state.manager;
    //     mgr.addCompany(company);
    //     this.setState(({manager:mgr}));
    // }

    addShip(ship){
        let mgr = this.state.manager;
        mgr.addShip(ship);
        this.setState(({manager:mgr}));
    }
    
    removeShip(name,company){
        let mgr = this.state.manager;
        mgr.removeShip(name,company);
        this.setState(({manager:mgr}));
    }

    updateShipStatus(name, company, status) {
        let mgr = this.state.manager;
        mgr.updateShipStatus(name, company, status);
        this.setState(({ manager: mgr }));
    }

    changeSelectedCaptain(captainName){
        let mgr = this.state.manager;
        let newCaptain=mgr.captains.findIndex(cap=> cap.name===captainName);
        this.setState({selectedCaptain:newCaptain});
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

    getActiveShips(){
        this.activeships=[
            new Ship("Titanic","Fiji Shipping", "Active")
        ]
        
        for(var i = 0; i < this.state.manager.ships.length; i++){
            if(this.state.manager.ships[i].status === "Active"){
                this.activeships.push(this.state.manager.ships[i]);
            }
        }
        
        return this.activeships;
    }


    addShiptoCrew(){

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
                        <NavButton mode={this.props.mode} link="changecaptain" text="Change Captain"/>
                        <NavButton mode={this.props.mode} link="activeships" text="Active Ships"/>
                        <NavButton mode={this.props.mode} link="updateshipstatus" text="Update Ship Status"/>
                    </ul>
                {this.props.mode==="Shipping Company Creation" && (<ShippingCompanyCreationForm />)}
                {this.props.mode==="Tracking Page" && (<TrackingPage captain={this.state.manager.captains[this.state.selectedCaptain]} ships={this.state.manager.ships} />) }
                {this.props.mode==="Ship List" && (<>
                    <ShipList />
                    </>)}
                {this.props.mode==="Change Captain" && ( <>
                    <div className="container">
                    <div className="form-group">
                        <label htmlFor="selectCaptain">
                            Selected Captain
                                    </label>
                        <select className="form-control"
                            id="selectCaptain"
                            name="selectCaptain"
                            value={this.state.selectedCaptain.name}
                            onChange={e => this.changeSelectedCaptain(e.target.value)}>
                            {this.state.manager.captains.map(cap => (<option>{cap.name}</option>))}
                        </select>
                    </div>
                </div>
                <CaptainCompanySelection captain={this.state.manager.captains[this.state.selectedCaptain].name} currentCompany={this.state.manager.captains[this.state.selectedCaptain].company} companyList={this.state.manager.companies} changeCompany={(c => this.changeCaptainCompany(c))} />
                </>
                )}
                {this.props.mode==="Active Ships" && (<ActiveShipsView activeships={this.getActiveShips()} />)}
                {this.props.mode==="Update Ship Status" && (<UpdateShipStatus companyList={this.state.manager.companies} updateShipStatus={input => this.updateShipStatus(input.name, input.company, input.status)} />)}
                </div> 
            </>
        )
    }
}