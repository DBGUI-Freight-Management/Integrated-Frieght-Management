import React from "react"
import { LogMessage } from "./LogMessage";

export class LogCreation extends React.Component{
    state={
        logHeader:"",
        logMessage:"",
        date: new Date()
    }

    submit(){
        let log = {
            header:this.state.logHeader,
            message:this.state.logMessage,
            date:this.state.date
        }
        this.props.submit(log);
        this.setState({logHeader:"", logMessage:""})
    }
    render(){
        return (
            <>
                <div className="container">
                    <h3>{this.props.captain}'s Log</h3>
                    <h4>{this.state.date.getMonth()+"/" + this.state.date.getDay()+"/"+this.state.date.getFullYear()}</h4>
                    <label htmlFor="logHeader">
                        Header
                    </label>
                    <input type="text"
                            id="logHeader"
                            name="logHeader"
                            className="form-control"
                            value={this.state.logHeader}
                            onChange={e=>this.setState({logHeader:e.target.value})}/>
                    <label htmlFor="logMessage">
                        Log Message
                    </label>
                    <textarea id="logMessage"
                                name="logMessage"
                                className="form-control"
                                rows="4"
                                value={this.state.logMessage}
                                onChange={e=>this.setState({logMessage:e.target.value})}/>
                    <div className="form-group">
                            <button type="button" className="btn btn-primary mb-2" onClick={e=>this.submit()}>Create Log Message</button>
                    </div>
                </div>
            </>
        )
    }
}