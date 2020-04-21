import React from 'react'
import { ShippingApi } from './API'
import { Redirect } from 'react-router-dom';

export class LoginPage extends React.Component{

    api = new ShippingApi(); 
    state={
        username:"",
        password:"",
        loginSuccessful:false
    }

    attemptLogin(){
        this.api.attemptLogin(this.state.username,this.state.password)
            .then(bool=>{
                    if(bool.userID!==undefined){
                        this.setState({loginSuccessful:true})
                        this.props.success();
                    }
                }
            )
    }


    render(){
        return <>
            {this.state.loginSuccessful && <Redirect to='/dashboard'/>}s
            <div className="container form-group pt-5">
                <label className='form-group'
                        htmlFor='username'>Username</label>
                <input type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={this.state.username}
                        onChange={e=>this.setState({username:e.target.value})}/>
                <label className='form-group'
                        htmlFor='password'>
                        Password
                </label>
                <input type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={e=>this.setState({password:e.target.value})}/>
                <button type="btn" className="btn btn-primary mt-2" onClick={()=>this.attemptLogin()}>Login</button>
            </div>
        
        </>
    }

}