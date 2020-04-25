import React from 'react'
import { ShippingApi } from './API'
import { Link , Redirect } from 'react-router-dom';
import { CreateAccount } from './Account/CreateAccount';

export class LoginPage extends React.Component{

    api = new ShippingApi(); 
    state={
        username:"",
        password:"",
        loginSuccessful:false,
        accountType:""
    }

    attemptLogin(){
        this.api.attemptLogin(this.state.username,this.state.password)
            .then(bool=>{
                    if(bool.userID!==undefined){
                        this.api.getSessionUserType()
                            .then(x=>this.setState({loginSuccessful:true,accountType:x.data[0].name}));
                    }
                }
            )
    }


    render(){
        return <>
            {this.state.loginSuccessful && this.state.accountType==="Captain" && <Redirect to='/dashboard/captain/route'/>}
            {this.state.loginSuccessful && this.state.accountType==="Freight Manager" && <Redirect to='/dashboard/freightmanager/trackingpage'/>}
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
                <button type="btn" className="btn btn-primary mt-2 col-2" onClick={()=>this.attemptLogin()}>Login</button>
                <Link className="position-relative float-right col-2 mt-2 btn btn-block btn-primary"
                        to='/createAccount'>
                    Create Account
                </Link>
                <div className="clearfix"></div>
            </div>
        </>
    }

}