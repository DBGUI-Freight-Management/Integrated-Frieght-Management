import React from 'react';
import './App.css';
import { captainDashRoutes} from './Captain';

import { ShippingApi } from './API';
import { Redirect, BrowserRouter, Route, Switch }  from 'react-router-dom';
import { LoginPage } from './Loginpage';




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
            {this.state.isLoggedIn && (<Redirect to='/dashboard/captain/logs'/>)}
            <Switch>
              <Route path='/login' render={()=><LoginPage success={()=>this.setState({isLoggedIn:true})}/>}/>
              {captainDashRoutes.map(route=>
                <Route key={route.path} {...route}/>)}
            </Switch>
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

