import React from "react"


export class CrewList extends React.Component{
    state={
        AddingCrewMember: false,
        newName:"",
        newRole:""
    }

    addCrew(){
        this.props.addCrewMember({name:this.state.newName,role:this.state.newRole})
        this.setState({newName:"", newRole:""});
    }

    cancel(){
        this.setState({AddingCrewMember:false, newName:"",newRole:""});
    }
    render(){
         return(
            <>
                <div className ="container">
                    <h3>{this.props.ship.name}</h3>
                    {this.state.AddingCrewMember && (
                        <>
                        <div className="form-group">                        
                            <label htmlFor="crewMemberName">
                                Crew Member Name
                            </label>
                            <input type="text"
                                    name="crewMemberName"
                                    id="crewMemberName"
                                    className="form-control"
                                    value={this.state.newName}
                                    onChange={e=>this.setState({newName:e.target.value})}/>
                            
                        </div>
                        <div className="form-group">
                            <label  hmtlFor="crewMemberRole">
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.ship.crew.map(crewMate=>(
                                <tr>
                                    <td>{crewMate.name}</td>
                                    <td>{crewMate.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}