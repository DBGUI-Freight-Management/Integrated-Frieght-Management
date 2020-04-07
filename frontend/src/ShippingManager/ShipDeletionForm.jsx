import React from 'react';

export class ShipDeletionForm extends React.Component {
    state = {
        name: "",
        owningCompany: "",
    }

    submit() {
        this.props.removeShip({name:this.state.name, company:this.state.owningCompany})
        this.setState({name:"",owningCompany:""});
    }

    render() {
        return (
            <>
                <form className="container">
                    <h1>
                        Delete a Ship
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
                            onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shippingCompany">
                            ShippingCompany
                        </label>
                        <select className="form-control"
                            id="shippingCompany"
                            name="shippingCompany"
                            value={this.state.owningCompany}
                            onChange={e => this.setState({ owningCompany: e.target.value })}>
                            <option></option>
                            {this.props.companyList.map(company => (<option>{company.name}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary mb-2" onClick={e => this.submit()}>Create</button>
                    </div>
                </form>

            </>
        )
    }
}