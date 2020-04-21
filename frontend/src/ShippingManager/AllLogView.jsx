import React from "react"

export class AllLogView extends React.Component{


    parseDate(mysqlDate){
        var dateParts = mysqlDate.split("-");
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    }
    render(){
        return(
            <>  
                <div className="container">
                    <h3>Captain {this.props.captain}'s Logs</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Log Header</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.logs.map((message,index)=>(
                                            <tr className="hover" key={index} onClick={()=>this.props.selectMessage(message)}>
                                                <td>
                                                        <p>{message.header}</p>
                                                        {message.location!=="" && message.location!==null && (<p>{message.location}</p>)}
                                                </td>    
                                                <td>
                                                        {this.parseDate(message.date).getMonth() + "/" + this.parseDate(message.date).getDay() + "/" + this.parseDate(message.date).getFullYear()}
                                                </td>
                                            </tr>
                                    )
                                    )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}