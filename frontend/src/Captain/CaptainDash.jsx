import React from "react"
import { NavButton } from "./NavButton"
import { CaptainLogView } from "./CaptainLogView"
import { CrewMember } from "../ShippingManager/models";
import { CrewList } from "../ShippingManager";
import { CargoList } from "../ShippingManager/CargoList";
import { StatusPage } from "./StatusPage";
export class CaptainDash extends React.Component{
    state={
        mode:"Ship Logs",
        logs:[],
        crew:[
            new CrewMember("Tyson", "Cook"),
            new CrewMember("Coach", "Fitness Manager"),
            new CrewMember("Boston Rob","Mechanic")
        ],
        ship: {name:"SS Pacific"},
        status:[
            {message:"In Port",
            date: new Date()}
        ],
        cargo: []
    }

    addLog(log){
        let newLogs = this.state.logs;
        newLogs.push(log);
        this.setState({logs:newLogs});
    }

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
                        <NavButton mode={this.state.mode} link="Ship Logs" change={()=>this.setState({mode:"Ship Logs"})}/>
                        <NavButton mode={this.state.mode} link="Status" change={()=>this.setState({mode:"Status"})}/>
                        <NavButton mode={this.state.mode} link="Crew" change={()=>this.setState({mode:"Crew"})}/> 
                        <NavButton mode={this.state.mode} link="Cargo" change={()=>this.setState({mode:"Cargo"})}/>
                    </ul>
                    {this.state.mode==="Ship Logs"&&(<CaptainLogView logs={this.state.logs} addLog={log=>this.addLog(log)}/>)}
                    {this.state.mode==="Status" &&(<StatusPage status={this.state.status} addStatus={status=>this.addStatus(status)} ship={this.state.ship}/>)}
                    {this.state.mode==="Crew" &&(<CrewList crew={this.state.crew} addCrewMember={member=>this.addCrewMember(member)} ship={this.state.ship}/>)}
                    {this.state.mode==="Cargo" && <CargoList cargo={this.state.cargo} addCargo={cargo => this.addCargo(cargo)} ship={this.state.ship} />}
                </div>
                
                
            </> 
        )
    }
}