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
                    <h3>{this.props.captain}'s Logs</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Log Header</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            {this.props.logs.reverse().map(message=>(
                                        <tr className="hover" onClick={()=>this.props.selectMessage(message)}>
                                            <td>
                                                    {message.header}
                                            </td>    
                                            <td>
                                                    {this.parseDate(message.date).getMonth() + "/" + this.parseDate(message.date).getDay() + "/" + this.parseDate(message.date).getFullYear()}
                                            </td>
                                        </tr>
                                )
                                )
                            }
                        </table>
                    </div>
                </div>
            </>
        )
    }
}