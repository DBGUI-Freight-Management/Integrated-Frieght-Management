import React from 'react'
import { ShippingApi } from '../API'

export class StatusPage extends React.Component{

    api = new ShippingApi();
    state={
        status:"",
        location:"",
        addingStatus:false,
        statuses:[]
    }

    addStatus(){
        this.api.createStatus(this.state.status,this.state.location).then(x=>
            this.api.getSessionStatus().then(x=>this.setState({statuses:x})));
        this.setState({status:"",addingStatus:false});
    }

    cancel(){
        this.setState({status:"", addingStatus:false})
    }

    parseDate(mysqlDate){
       
        return new Date(Date.parse(mysqlDate.replace(/[-]/g,'/')))
    }

    render(){
        return(
            <>
                <div className ="container">
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
                            <label htmlFor="location">
                                Location
                            </label>
                            <input type="text"
                                    name="location"
                                    id="location"
                                    className="form-control mb-2"
                                    value={this.state.location}
                                    onChange={e=>this.setState({location:e.target.value})}/>
                            
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
                            <th>Location</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.statuses.map((status,index)=>(
                            <tr key={index}>
                                <td>{status.status}</td>
                                <td>{status.location}</td>
                                <td>{status.date.substring(5,7)+"/" + status.date.substring(8,10)+"/"+status.date.substring(0,4)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </>)}

    componentDidMount(){
        this.api.getSessionStatus().then(x=>this.setState({statuses:x}));
    }
}