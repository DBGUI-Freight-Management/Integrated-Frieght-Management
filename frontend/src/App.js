import React from 'react';
import './App.css';
import { CaptainDash } from './Captain';
import { ShipCreationForm, ShippingManagerPage } from './ShippingManager';
import { ShippingApi } from './API';
import { Redirect, BrowserRouter, Route }  from 'react-router-dom';
import { LoginPage } from './Loginpage';


export class App extends React.Component {
  
  state={
    isLoggedIn:true,
    ShippingApi: new ShippingApi()
  }

  
  
  render(){  
    return (
      <>
        
        <main>
          <BrowserRouter>
            {!this.state.isLoggedIn && (<Redirect to='/login'/>)}
            {this.state.isLoggedIn && (<Redirect to='/dashboard'/>)}
            <Route path='/login' component={LoginPage}/>
            <Route path='/dashboard' component={CaptainDash}/>
            
          </BrowserRouter>
        </main>
      
    </>
    )
  };

  componentDidMount(){
    let isLoggedIn=false;
    this.state.ShippingApi.isLoggedIn().then(bool=>{
      console.log(bool);
      isLoggedIn=bool;
    });

    this.setState({isLoggedIn});
  }
}

export default App;
