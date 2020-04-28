import React from "react"
import { ShippingCompanyCreationForm } from "./ShippingCompanyCreationForm"
import { ShipList } from "./ShipList"
import { ActiveShipsView } from "./ActiveShipsView"
import { TrackingPage } from "./TrackingPageView"
import { UpdateShipStatus } from "./UpdateShipStatus"
import { NavButton } from "../Captain/NavButton"
import {CreateRouteForm} from "./CreateRouteForm"
import {Link} from 'react-router-dom'

export class ShippingManagerPage extends React.Component{

    render() {
        return (
            <>
                <div className="container">
                    <h2>Freight Manager View</h2>
                    <Link className="btn btn-secondary float-right" to='/login'> Logout</Link>
                    <ul className="list-group list-group-horizontal border-bottom mb-2">
                        <NavButton mode={this.props.mode} link="companycreation" text="Shipping Company Creation"/>
                        <NavButton mode={this.props.mode} link="createroute" text="Create Route" />
                        <NavButton mode={this.props.mode} link="trackingpage" text="Tracking Page"/>
                        <NavButton mode={this.props.mode} link="shiplist" text="Ship List"/>
                        <NavButton mode={this.props.mode} link="activeships" text="Active Ships"/>
                        <NavButton mode={this.props.mode} link="updateshipstatus" text="Update Ship Status"/>
                    </ul>
                {this.props.mode==="companycreation" && (<ShippingCompanyCreationForm />)}
                {this.props.mode==="createroute" && (<CreateRouteForm />)}
                {this.props.mode==="trackingpage" && (<TrackingPage />)}
                {this.props.mode==="shiplist" && (<ShipList />)}
                {this.props.mode==="activeships" && (<ActiveShipsView />)}
                {this.props.mode==="updateshipstatus" && (<UpdateShipStatus />)}
                </div> 
            </>
        )
    }
}