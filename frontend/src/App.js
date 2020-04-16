import React from 'react';
import './App.css';
import { CaptainDash } from './Captain';
import { ShipCreationForm, ShippingManagerPage } from './ShippingManager';
import { ShippingApi } from './API';
import { Redirect, BrowserRouter, Route }  from 'react-router-dom';
import { LoginPage } from './Loginpage';
import { ShippingManager } from './ShippingManager/models';


export class App extends React.Component {
  
  api = new ShippingApi();
  
  state={
    isLoggedIn: false
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
    let isLoggedIn= false;
    this.api.isLoggedIn().then(x=>isLoggedIn=x);
    this.setState({isLoggedIn});
  }
}

export default App;
