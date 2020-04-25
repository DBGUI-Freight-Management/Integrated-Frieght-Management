import React from 'react';
import {Redirect} from 'react-router-dom'
export class NavButton extends React.Component{
    
    state={
        clicked:false
    }

    render(){

       

        return (<>
            
            {this.props.mode === this.props.link && (
                <li className="list-group-item bg-secondary text-white">{this.props.text}</li>)
            }
            {this.props.mode !==this.props.link && 
                (
                    <>
                        {this.state.clicked && <Redirect to={this.props.link}/>}
                        <li className="list-group-item border-0" onClick={e=>this.setState({clicked:true})}>{this.props.text}</li>
                    </>
                )
            }
        
            </>
        )
    }
}
