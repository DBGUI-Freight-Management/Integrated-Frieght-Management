import React from 'react'
import { AllLogView, LogCreation, LogMessage } from '../ShippingManager'
import { ShippingApi } from '../API';

export class CaptainLogView extends React.Component{
    state={
        ShippingApi: new ShippingApi(),
        selectedMessage: false,
        captainFName: "",
        captainLName:"",
        AddingLog:false,
        logs:[]
    }

    setMessage(message){
        this.setState({selectedMessage:message});
    }

    addMessage(log){
        this.state.ShippingApi.createLog(log.header,log.message,log.location)
            .then(x=>{
                    this.setState({AddingLog:false});
                    this.state.ShippingApi.getLogs()
                    .then(y=>{
                        console.log(y);
                        this.setState({logs:y})
                        });
                    });
    }

    render() {
        return(
            <>
                {!this.state.selectedMessage && !this.state.AddingLog && (<button type="btn" className="btn btn-success float-right" onClick={e=>this.setState({AddingLog:true})}>Add Log</button>)}
                {!this.state.selectedMessage&& !this.state.AddingLog && (<AllLogView logs={this.state.logs} selectMessage={message=>this.setMessage(message)} captain={this.state.captainLName}/>)}
                {this.state.AddingLog&&(<LogCreation captain={this.state.captainLName} submit={log=>this.addMessage(log)}/>)}
                {this.state.selectedMessage&& <>
                    <button type="btn" className="btn btn-primary float-right" onClick={e=>this.setState({selectedMessage:false})}>Back To Log View</button>
                    <LogMessage captain={this.state.captainLName} log={this.state.selectedMessage}/>
                </>}
            </> 
        )
    }

    componentDidMount(){
        this.state.ShippingApi.getLogs().then(x=>this.setState({logs:x}));
        this.state.ShippingApi.getUserInfo().then(x=>this.setState({captainFName:x[0].firstName, captainLName:x[0].lastName}));
    }
}