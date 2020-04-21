import React from "react"
import { ShippingApi } from "../API";



export class CargoList extends React.Component{
    
    api = new ShippingApi();

    state={
        AddingCargo: false,
        name:"",
        quantity:0,
        owningCompany:"",
        companies:[],
        ship:"",
        cargo:[]
    }

    addCargo(){
        if(this.state.name!=="" && this.state.quantity!==0){

            let companyId = this.state.companies.find(x=>x.companyName===this.state.owningCompany).companyID;
           
            this.api.addSessionCargo({name:this.state.name,owner:companyId,quantity:this.state.quantity})
                .then(x=>this.api.getSessionCargo().then(y=>{console.log(y);this.setState({cargo:y})}));
            this.setState({newName:"", quantity:0});
        }
    }

    componentDidMount(){
        this.api.getSessionShip().then(x=>this.setState({ship:x[0].name}));
        this.api.getSessionCargo().then(x=>{console.log(x);this.setState({cargo:x})});
        this.api.getCompanies().then(x=>this.setState({companies:x}));
        console.log(this.state.cargo);
    }

    cancel(){
        this.setState({AddingCargo:false, name:"",quantity:0,owningCompany:""});
    }
    render(){
         return(
            <>
                <div className ="container">
                    <h3>{this.state.ship} Cargo</h3>
                    {this.state.AddingCargo && (
                        <>
                        <div className="row">
                            <div className="form-group col-7 border-0">                        
                                <label htmlFor="cargoName">
                                    Cargo Name
                                </label>
                                <input type="text"
                                        name="cargoName"
                                        id="cargoName"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={e=>this.setState({name:e.target.value})}/>
                                
                            </div>
                            <div className="form-group col-4 border-0">
                                <label hmtlFor="quantity">
                                    Quantity
                                </label>
                                <input type="text"
                                    name="quantity"
                                    id="quantity"
                                    className="form-control"
                                    value={this.state.quantity}
                                    onChange={e=>this.setState({quantity:e.target.value})}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-11 border-0">
                            <label htmlFor="company">
                                Company
                            </label>
                            <select className="form-control"
                                    id="company"
                                    name="company"
                                    value={this.state.owningCompany}
                                    onChange={e=>this.setState({owningCompany:e.target.value})}>
                                <option></option>
                                {this.state.companies.map(company=>
                                    <option key={company.companyID}>{company.companyName}</option>
                                )}
                            </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" type="btn" onClick={e=>this.addCargo()} >
                                Submit Cargo
                            </button>
                            <button className="btn btn-info ml-1" type="btn" onClick={e=>this.cancel()}>
                                Stop Adding
                            </button>
                        </div></>)}
                </div>
                <div className="container">
                    {!this.state.AddingCargo && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({AddingCargo:true})}>Add Cargo</button>)}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Cargo</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cargo.map((cargo,index)=>(
                                <tr key={index}>
                                    <td>{cargo.name}</td>
                                    <td>{cargo.companyName}</td>
                                    <td>{cargo.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}