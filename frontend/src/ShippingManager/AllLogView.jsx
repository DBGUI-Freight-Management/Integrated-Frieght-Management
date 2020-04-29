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
                                                        {message.date.substring(5,7)+"/" + message.date.substring(8,10)+"/"+message.date.substring(0,4)}
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