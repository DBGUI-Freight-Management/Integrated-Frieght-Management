import React from 'react';

export class UpdateShipStatus extends React.Component {
    state = {
        name: "",
        owningCompany: "",
        status: "",
    }

    submit() {
        this.props.updateShipStatus({ name: this.state.name, company: this.state.owningCompany, state: this.state.status });
        this.state.name = "";
        this.state.owningCompany = "";
        this.state.status = "";
    }

    render() {
        return (
            <>
                <form className="container">
                    <h1>
                        Update a Ship's status
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
                        <label htmlFor="shipStatus">
                            Ship Status:
                        </label>
                        <input type="text"
                            id="shipStatus"
                            name="shipStatus"
                            className="form-control"
                            value={this.state.status}
                            onChange={e => this.setState({ state: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary mb-2" onClick={e => this.submit()}>Update Status</button>
                    </div>
                </form>

            </>
            )
        }
    }
