import React from "react"

export class ActiveShipsView extends React.Component{
    render(){
        return(
            <>
                <form className="container">
                    <h1>Active Ships Log</h1>
                    <div className="row rowHead">
                        <div className="col-4">Ship Name</div>
                        <div className="col-4">Captain</div>
                        <div className="col-4">Destination</div>
                    </div>
                    {this.props.activeships.map(ship => (
                        <div className="row">
                        <div className="col-4">{ ship.name }</div>
                        <div className="col-4">
                            <p>Ship Captain</p>
                        </div>
                        <div className="col-4">
                            <p>Ship Destination</p>
                        </div>
                        </div>
                    ))}
                </form>
            </>
        )
            
    }
}
