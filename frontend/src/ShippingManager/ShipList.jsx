import React from "react"

export class ShipList extends React.Component{
    render(){
        return(
            <>
                <div className="container">
                    <h1>
                        Ships List
                    </h1>
                    <div className="row rowHead">
                        <div className="col-4">Ship Name</div>
                        <div className="col-8">Ship Status</div>
                    </div>
                    {this.props.ships.map(ship => (
                            <div className="row">
                                <div className="col-4">{ ship.name }</div>
                                <div className="col-8">
                                    <p>{ ship.owningCompany }</p>
                                    <p>{ ship.status} </p>
                                </div>
                            </div>
                        ))}
                </div>
            </>
        )
    }
};

