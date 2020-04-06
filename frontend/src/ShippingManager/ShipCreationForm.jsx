import React from 'react';
import { Ship } from './models';

export class ShipCreationForm extends React.Component{
    state = {
        name:"",
        owningCompany:"",
        shipStatus:""
    }

    submit(){
            let newShip = new Ship(this.state.name,this.state.owningCompany,this.state.shipStatus);
            this.setState({name:"", owningCompany:"", shipStatus:""});
            this.props.addship(newShip);
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
                                {this.props.companyList.map(company=>(<option>{company.name}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">
                            Ship Status
                        </label>
                        <input type="text"
                                id="status"
                                name="status"
                                className="form-control"
                                value={this.state.shipStatus}
                                onChange={e=>this.setState({shipStatus:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary mb-2" onClick={e=>this.submit()}>Create</button>
                    </div>
                </form>
            
            </>
        )
    }

}