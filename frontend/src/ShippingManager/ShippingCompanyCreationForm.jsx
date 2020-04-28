import React from 'react';
import {ShippingApi} from "../API"


export class ShippingCompanyCreationForm extends React.Component{
    api = new ShippingApi();
    state= {
        name:"",
        userID:"",
        companyAdded:false
    }

    submitCompany(){
        this.api.addCompany(this.state.name, this.state.userID)
            .then(()=>{
                this.setState({companyAdded:true});
                alert("Company Added!");
            });
        this.setState({name:""}); 
    }

    render() {
        return (
            <>
                
                <form className="container">
                    <h1>
                        Create a Shipping Company
                    </h1>
                    {this.state.companyAdded && <h3>Company Added Successfuly</h3>}
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
                        <button type="button" className="btn btn-primary mb-2" onClick={e=>this.submitCompany()}>Create</button>
                    </div>
                </form>
            </>
        );
    }

    componentDidMount(){
        this.api.getUserID()
            .then(ID => this.setState({userID:ID.userID})
            );
    }
}