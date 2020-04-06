import React from "react"

export class CaptainCompanySelection extends React.Component{
    state={
        company: this.props.currentCompany
    }

    submit(){
        this.props.changeCompany(this.state.owningCompany);
        this.setState({company:""});
    }

    render(){
        return (
            <>
                <div className="container">
                    <h3>{this.props.captain}</h3>
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
                            <button type="button" className="btn btn-primary mb-2" onClick={e=>this.submit()}>Create</button>
                    </div>
                </div>
            </>
        )
    }

}