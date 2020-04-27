import React from 'react';
import { UserType } from './UserType';
import { Link,Redirect } from 'react-router-dom'
import { ShippingApi } from '../API/ShippingApi';

const api = new ShippingApi();

export class CreateAccount extends React.Component {
    
    userTypes = [
        new UserType(1,"Captain"),
        new UserType(2,"Freight Manager")
    ];

    state = {
        userName: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        userTypeId: 0,
        password: '',
        confirmPass: '',
        loginSuccessful:false,
        accountType:''
    };

    onSubmit() {
        if(this.state.password === this.state.confirmPass) {
                api.createAccount(this.state).then(x=>{
                    api.attemptLogin(this.state.userName,this.state.password)
                        .then(bool=>{
                            if(bool.userID!==undefined){
                            api.getSessionUserType()
                                .then(x=>this.setState({loginSuccessful:true,accountType:x.data[0].name}));
                    }
                }
            )});}
    }

    render() {

        
        return (
            <>
            {this.state.loginSuccessful && this.state.accountType==="Captain" && <Redirect to='/dashboard/captain/route'/>}
            {this.state.loginSuccessful && this.state.accountType==="Freight Manager" && <Redirect to='/dashboard/freightmanager/trackingpage'/>}   

            <form className="container">
                    <h1>Create New Account</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={this.state.userName}
                                onChange={ e => this.setState({ userName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input type="text"
                                id="fname"
                                name="fname"
                                className="form-control"
                                value={this.state.fname}
                                onChange={ e => this.setState({ fname: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text"
                                id="lname"
                                name="lname"
                                className="form-control"
                                value={this.state.lname}
                                onChange={ e => this.setState({ lname: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={ e => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="phone"
                                id="phone"
                                name="phone"
                                className="form-control"
                                value={this.state.phone}
                                onChange={ e => this.setState({ phone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userType">Type of User</label>
                        <select name="userType" 
                            id="userType"
                            className="form-control"
                            value={this.state.userTypeId}
                            onChange={ e => this.setState({ userTypeId: e.target.value })}
                            >
                            <option></option>
                            {
                                this.userTypes.map((d,i) => <option key={i} value={d.id}> {d.type} </option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <ul>
                            <li>Must be at least 8 characters in length</li>
                            <li>Must contain a number</li>
                            <li>Must contain a capital letter</li>
                            <li>Must contain a symbol (i.e '#','$','%','@')</li>
                        </ul>
                        <input type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={ e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                value={this.state.confirmPass}
                                onChange={ e => this.setState({ confirmPass: e.target.value })}
                        />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary mb-2 col-2"
                        onClick={ () => this.onSubmit() }>
                        Create Account
                    </button>
                    <Link className="position-relative float-right col-2 btn btn-primary mb-2"
                        to='/Login'>
                        Cancel
                    </Link>     
                    <div className="clearfix"></div>                
                </form>
        </>
        )
    }

}