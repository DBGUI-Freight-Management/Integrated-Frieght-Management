import React from "react"

export class TrackingPage extends React.Component{

    getCompanyShips(){
        this.companyShips = [];
        for(var i = 0; i < this.props.ships.length; i++){
            if(this.props.captain.company === this.props.ships[i].owningCompany){
                this.companyShips.push(this.props.ships[i]);
            }
        }
        return this.companyShips;
    }
    
    render(){
        return(
            <>
            <form className="container">
                    <h1>Tracking Page</h1>
                <div className="form-group">
                    <label htmlFor="companyShipList">
                        Company Ship List
                    </label>
                    <select className="form-control"
                        id="companyShipList"
                        name="companyShipList">
                        <option></option>
                        {this.getCompanyShips().map(ship=>(<option>{ship.name}</option>))}
                    </select>
                    <button type="button" className="btn btn-primary mb-2">View Ship Reports</button>
                    {/*this button will show past status reports when those are eventually a thing*/}
                </div>
            </form>
            <div className="container">
                    <div className="row rowHead">
                        <div className="col-4">Ship Name</div>
                        <div className="col-4">Ship Location</div>
                        <div className="col-4">Past Locations</div>
                    </div>
                    {this.props.ships.map(ship => (
                            <div className="row">
                                <div className="col-4">{ ship.name }</div>
                                <div className="col-4">
                                    <p>{ ship.location }</p>
                                </div>
                                <div className="col-4">
                                    {ship.pastLocations.map(location =>(
                                        <p>{location}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </>
        )
    }
};