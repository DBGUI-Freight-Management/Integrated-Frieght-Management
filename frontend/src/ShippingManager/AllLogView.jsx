import React from "react"

export class AllLogView extends React.Component{

    render(){
        return(
            <>  
                <div className="container">
                    <h3>{this.props.captain.name}'s Logs</h3>
                    <div className="container">
                        {this.props.logs.map(message=>(
                                    <div className="row rounded hover" onClick={()=>this.props.selectMessage(message)}>
                                        <div className="col-8 rounded">
                                                {message.header}
                                        </div>    
                                        <div className="col-4 rounded">
                                                {message.date.getMonth()+"/" +message.date.getDay()+"/"+message.date.getFullYear()}
                                        </div>
                                    </div>
                            )
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}