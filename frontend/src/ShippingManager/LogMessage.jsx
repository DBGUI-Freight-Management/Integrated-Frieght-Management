import React from "react"

export class LogMessage extends React.Component{
    render(){
        return (
            <>
                {console.log(this.props)}
                <div className="container">
                    <h3>{this.props.log.captain.name}</h3>
                    <h4>{this.props.log.date.getMonth()+"/" +this.props.log.date.getDay()+"/"+this.props.log.date.getFullYear()}</h4>
                    <h4>{this.props.log.header}</h4>
                    <p>{this.props.log.message}</p>
                </div>
            </>
        )
    }
}