import React from "react"
import { ShippingApi } from "../API";


export class CrewList extends React.Component{
    
    api = new ShippingApi();
    
    state={
        AddingCrewMember: false,
        ship:"",
        newFName:"",
        newLName:"",
        newRole:"",
        crew:[]
    }

    addCrew(){
        if(this.state.newName!==""){
            this.api.addSessionCrew({newFName:this.state.newFName,newLName:this.state.newLName,newRole:this.state.newRole}).then(x=>{
                this.api.getSessionCrew().then(x=>this.setState({crew:x}));
            })
            this.setState({newFName:"", newLName:"", newRole:""});
        }
    }

    cancel(){
        this.setState({AddingCrewMember:false, newFName:"",newLName:"",newRole:""});
    }

    componentDidMount(){
        this.api.getSessionCrew().then(x=>this.setState({crew:x}));
        this.api.getSessionShip().then(x=>this.setState({ship:x[0].name}));
    }


    parseDate(mysqlDate){
        var dateParts = mysqlDate.split("-");
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    }

    deboard(crew){
        this.api.deboardCrewMember(crew).then(this.api.getSessionCrew().then(x=>this.setState({crew:x})));
    }

    render(){
         return(
            <>
                <div className ="container">
                    <h3>{this.state.ship} Crew</h3>
                    {this.state.AddingCrewMember && (
                        <>
                        <div className="form-group">                        
                            <label htmlFor="crewMemberFName">
                                First Name
                            </label>
                            <input type="text"
                                    name="crewMemberFName"
                                    id="crewMemberFName"
                                    className="form-control"
                                    value={this.state.newFName}
                                    onChange={e=>this.setState({newFName:e.target.value})}/>
                            
                        </div>
                        <div className="form-group">                        
                            <label htmlFor="crewMemberLName">
                                Last Name
                            </label>
                            <input type="text"
                                    name="crewMemberLName"
                                    id="crewMemberLName"
                                    className="form-control"
                                    value={this.state.newLName}
                                    onChange={e=>this.setState({newLName:e.target.value})}/>
                            
                        </div>
                        <div className="form-group">
                            <label hmtlFor="crewMemberRole">
                                Crew Member Role
                            </label>
                            <input type="text"
                                name="crewMemberRole"
                                id="crewMemberRole"
                                className="form-control"
                                value={this.state.newRole}
                                onChange={e=>this.setState({newRole:e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" type="btn" onClick={e=>this.addCrew()} >
                                Submit Crew Member 
                            </button>
                            <button className="btn btn-info ml-1" type="btn" onClick={e=>this.cancel()}>
                                Stop Adding
                            </button>
                        </div></>)}
                </div>
                <div className="container">
                    {!this.state.AddingCrewMember && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({AddingCrewMember:true})}>Add Crew Member</button>)}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Date Boarded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.crew && this.state.crew.map(crewMate=>(
                                <>
                                    {crewMate.dateDeboarded===null &&
                                    <tr key={crewMate.id}>
                                        <td>{crewMate.fname + " " + crewMate.lname}</td>
                                        <td>{crewMate.role}</td>
                                        <td>{crewMate.date && this.parseDate(crewMate.date).getMonth()+"/" +this.parseDate(crewMate.date).getDay()+"/"+ this.parseDate(crewMate.date).getFullYear()}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={e=>this.deboard(crewMate.id)}><span aria-hidden="true">&times;</span></button></td>
                                    </tr>}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}