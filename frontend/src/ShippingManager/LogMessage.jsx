import React from "react"

export class LogMessage extends React.Component{

    parseDate(mysqlDate){
        var dateParts = mysqlDate.split("-");
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    }

    render(){
        return (
            <>
                <div className="container">
                    <h3>Captain {this.props.captain}'s log</h3>
                    <h4>{this.props.log.date.substring(5,7)+"/" + this.props.log.date.substring(8,10)+"/"+this.props.log.date.substring(0,4)}</h4>
                    <h4>{this.props.log.header}</h4>
                    <h4>{this.props.log.location}</h4>
                    <p>{this.props.log.message}</p>
                </div>
            </>
        )
    }
}