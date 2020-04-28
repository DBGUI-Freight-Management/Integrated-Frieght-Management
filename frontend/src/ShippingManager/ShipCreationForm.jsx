import React from 'react';
import { ShippingApi } from '../API';

export class ShipCreationForm extends React.Component{
    
    shippingApi = new ShippingApi();

    state = {
        name:"",
        owningCompany:"",
        companies:[]
    }

    submit(){
           this.state.companies.forEach(company=>{
               if(company.companyName === this.state.owningCompany){
                 this.props.onSubmit(this.state.name,company.companyID);
                 this.setState({name:"", owningCompany:""});
                }
            });
    }

    render(){
        
        return (
            <>
                <form className="container">
                    <h1>
                        Create a Ship
                    </h1>
                    <div className="form-group">
                        <label htmlFor="shipName">
                            Ship Name:
                        </label>
                        <input type="text"
                                id="shipName"
                                name="shipName"
                                className="form-control"
                                value={this.state.name}
                                onChange={e=>this.setState({name:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shippingCompany">
                            Shipping Company
                        </label>
                        <select className="form-control"
                                id="shippingCompany"
                                name="shippingCompany"
                                value={this.state.owningCompany}
                                onChange={e=>this.setState({owningCompany:e.target.value})}>
                                    <option></option>
                                {this.state.companies.map(company=>(<option key={company.companyID}>{company.companyName}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary mb-2" onClick={e=>this.submit()}>Create</button>
                    </div>
                </form>
            </>
        )
    }

    componentDidMount(){
        this.shippingApi.getCompanies().then(companies=>this.setState({companies}));
    }

}