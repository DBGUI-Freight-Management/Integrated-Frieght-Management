import React from "react"
export class CaptainDash extends React.Component{
    state={
        mode:"LogView"
    }

    render(){
        return (
            <>
                <div className="container">
                    <h2>Captain View</h2>
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item">Ship Logs</li>
                        <li className="list-group-item">Crew</li>
                    </ul>
                </div>
                
            </> 
        )
    }
}