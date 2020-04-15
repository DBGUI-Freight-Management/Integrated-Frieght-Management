import React from 'react'

export class StatusPage extends React.Component{

    state={
        status:"",
        addingStatus:false
    }

    addStatus(){
        this.setState({status:""})
        this.props.addStatus({message:this.state.status, date:new Date()})
    }

    cancel(){
        this.setState({status:"", addingStatus:false})
    }
    render(){
        return(
            <>
                <div className ="container">
                    <h3>{this.props.ship.name}</h3>
                    {this.state.addingStatus && (     
                        <>                  
                            <label htmlFor="status">
                                Status
                            </label>
                            <input type="text"
                                    name="status"
                                    id="status"
                                    className="form-control mb-2"
                                    value={this.state.status}
                                    onChange={e=>this.setState({status:e.target.value})}/>
                            
                            <div className="form-group">
                                <button className="btn btn-success mb-3" type="btn" onClick={e=>this.addStatus()} >
                                    Update Status
                                </button>
                                <button className="btn btn-info ml-1 mb-3" type="btn" onClick={e=>this.cancel()}>
                                    Cancel
                                </button>
                            </div>
                        </>)}
                </div>
            <div className="container">
                {!this.state.addingStatus && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({addingStatus:true})}>Update Status</button>)}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.status.reverse().map(status=>(
                            <tr>
                                <td>{status.message}</td>
                                <td>{status.date.getMonth()+"/" + status.date.getDay()+"/"+ status.date.getFullYear()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </>)}
}