import React from "react"


export class CargoList extends React.Component{
    state={
        AddingCargo: false,
        name:"",
        quantity:0,
    }

    addCargo(){
        if(this.state.name!==""){
            this.props.addCargo({name:this.state.name,quantity:this.state.quantity, date: new Date()})
            this.setState({newName:"", quantity:0});
        }
    }

    cancel(){
        this.setState({AddingCrewMember:false, name:"",quantity:0});
    }
    render(){
         return(
            <>
                <div className ="container">
                    <h3>{this.props.ship.name}</h3>
                    {this.state.AddingCargo && (
                        <>
                        <div className="row">
                            <div className="form-group col-7 border-0">                        
                                <label htmlFor="cargoName">
                                    Cargo Name
                                </label>
                                <input type="text"
                                        name="cargoName"
                                        id="cargoName"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={e=>this.setState({name:e.target.value})}/>
                                
                            </div>
                            <div className="form-group col-4 border-0">
                                <label  hmtlFor="quantity">
                                    Quantity
                                </label>
                                <input type="text"
                                    name="quantity"
                                    id="quantity"
                                    className="form-control"
                                    value={this.state.quantity}
                                    onChange={e=>this.setState({quantity:e.target.value})}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" type="btn" onClick={e=>this.addCargo()} >
                                Submit Cargo
                            </button>
                            <button className="btn btn-info ml-1" type="btn" onClick={e=>this.cancel()}>
                                Stop Adding
                            </button>
                        </div></>)}
                </div>
                <div className="container">
                    {!this.state.AddingCrewMember && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({AddingCargo:true})}>Add Cargo</button>)}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Cargo</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.cargo.map(cargo=>(
                                <tr>
                                    <td>{cargo.name}</td>
                                    <td>{cargo.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}