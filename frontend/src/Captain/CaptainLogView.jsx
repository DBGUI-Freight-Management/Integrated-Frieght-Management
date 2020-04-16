import React from 'react'
import { AllLogView, LogCreation, LogMessage } from '../ShippingManager'
import { ShippingApi } from '../API';

export class CaptainLogView extends React.Component{
    state={
        ShippingApi: new ShippingApi(),
        selectedMessage: false,
        captain: "Steve",
        AddingLog:false,
        logs:[]
    }

    setMessage(message){
        this.setState({selectedMessage:message});
    }

    addMessage(log){
        this.state.ShippingApi.createLog(log.header,log.message).then(x=>this.setState({AddingLog:false}));
    }

    render() {
        return(
            <>
                {!this.state.selectedMessage && !this.state.AddingLog && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({AddingLog:true})}>Add Log</button>)}
                {!this.state.selectedMessage&& !this.state.AddingLog && (<AllLogView logs={this.state.logs} selectMessage={message=>this.setMessage(message)} captain={this.state.captain}/>)}
                {this.state.AddingLog&&(<LogCreation captain={this.state.captain} submit={log=>this.addMessage(log)}/>)}
                {this.state.selectedMessage&& <>
                    <button type="btn" className="btn btn-primary float-right" onClick={e=>this.setState({selectedMessage:false})}>Back To Log View</button>
                    <LogMessage captain={this.state.captain} log={this.state.selectedMessage}/>
                </>}
            </> 
        )
    }

    componentDidMount(){
        this.state.ShippingApi.getLogs().then(x=>this.setState({logs:x}));
    }
}