import React from 'react';
import { ShippingApi } from '../API';

const api = new ShippingApi();
export class UpdateCaptainInfo extends React.Component{
    state={
        companyList:[],
        selectedCompany:'',
        password:'',
        checkPassword:'',
        newEmail:''
    }
    
    componentDidMount(){
        api.getCompanies().then(x=>this.setState({companyList:x}))
    }

    submit(){
        if(this.state.password === this.state.checkPassword && this.state.password!== ''){
            api.updateSessionPassword(this.state.password).then(x=>{});
        }
        if(this.state.selectedCompany !== ''){
            let finalIndex = 0;
            this.state.companyList.forEach((company,index)=>{
                if(company.companyName === this.state.selectedCompany){
                    finalIndex=index
                }
            })
            
            
            api.updateSessionCompany(this.state.companyList[finalIndex].companyID)
                .then(x=>{});
        }
        if(this.state.newEmail!== ''){
            api.updateSessionEmail(this.state.newEmail)
                .then(x=>{})
        }

        this.setState({selectedCompany:'',
        password:'',
        checkPassword:'',
        newEmail:''})
    }

    reset(){
        this.setState({companyList:[],
            selectedCompany:'',
            password:'',
            checkPassword:'',
            newEmail:''});
    }

    render(){
        return (
            <>
                <div className="container">
                    <div className='form-group'>
                        <label htmlFor="password">Update Password</label>
                        <input type='password'
                                className="form-control"
                                name="password"
                                id="password"
                                value={this.state.password}
                                onChange={e=>this.setState({password:e.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type='password'
                                className="form-control"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={this.state.checkPassword}
                                onChange={e=>this.setState({checkPassword:e.target.value})}/>
                    </div>
                    <div className="form-group">
                            <label htmlFor="company">
                                Update Company
                            </label>
                            <select className="form-control"
                                    id="company"
                                    name="company"
                                    value={this.state.selectedCompany}
                                    onChange={e=>this.setState({selectedCompany:e.target.value})}>
                                <option></option>
                                {this.state.companyList.map(company=>
                                    <option key={company.companyID}>{company.companyName}</option>
                                )}
                            </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Update Email
                        </label>
                        <input type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={this.state.newEmail}
                                onChange={e=>this.setState({newEmail:e.target.value})}/>
                    </div>
                    <button type="btn" className="btn btn-success mr-1" onClick={e=>this.submit()}>Submit Changes</button>
                    <button type="btn" className="btn btn-primary" onClick={e=>this.reset()}>Undo Changes</button>
                </div>
            </>
        )
    }
}