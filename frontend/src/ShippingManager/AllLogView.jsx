import React from "react"

export class AllLogView extends React.Component{

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
                                                    {message.date.getMonth()+"/" +message.date.getDay()+"/"+message.date.getFullYear()}
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