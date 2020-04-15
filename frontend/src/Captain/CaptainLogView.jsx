import React from 'react'
import { AllLogView, LogCreation, LogMessage } from '../ShippingManager'

export class CaptainLogView extends React.Component{
    state={
        selectedMessage: false,
        captain: "Steve",
        AddingLog:false
    }

    setMessage(message){
        this.setState({selectedMessage:message});
    }

    addMessage(log){
        this.setState({AddingLog:false})
        this.props.addLog(log);
    }

    render() {
        return(
            <>
                {!this.state.selectedMessage && !this.state.AddingLog && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({AddingLog:true})}>Add Log</button>)}
                {!this.state.selectedMessage&& !this.state.AddingLog && (<AllLogView logs={this.props.logs} selectMessage={message=>this.setMessage(message)} captain={this.state.captain}/>)}
                {this.state.AddingLog&&(<LogCreation captain={this.state.captain} submit={log=>this.addMessage(log)}/>)}
                {this.state.selectedMessage&& <>
                    <button type="btn" className="btn btn-primary float-right" onClick={e=>this.setState({selectedMessage:false})}>Back To Log View</button>
                    <LogMessage captain={this.state.captain} log={this.state.selectedMessage}/>
                </>}
            </> 
        )
    }
}