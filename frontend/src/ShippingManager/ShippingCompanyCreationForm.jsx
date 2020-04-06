import React from 'react';
import {Company} from "./models"


export class ShippingCompanyCreationForm extends React.Component{
    state= {
        name:"",
        address:"",
        email:"",
        description:"",
    }

    submitCompany(){
        this.props.addCompany(new Company(this.state.name,this.state.address,this.state.email,this.state.description));
        this.setState({name:"", address:"", email:"", description:""}); 
    }

    render() {
        return (
            <>
                <form className="container">
                    <h1>
                        Create a Shipping Company
                    </h1>
                    <div className="form-group">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={e=>this.setState({name:e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">
                            Address
                        </label>
                        <input type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                value={this.state.address}
                                onChange={e=>this.setState({address:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>
                            <input type="text"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={e=>this.setState({email:e.target.value})}/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea className="form-control"
                                rows="4"
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={e=>this.setState({description:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary mb-2" onClick={e=>this.submitCompany()}>Create</button>
                    </div>
                </form>
            </>
        );
    }

}