import React from 'react';
import './App.css';
import { captainDashRoutes} from './Captain';

import { ShippingApi } from './API';
import { Redirect, BrowserRouter, Route, Switch }  from 'react-router-dom';
import { LoginPage } from './Loginpage';
import { CreateAccount } from './Account/CreateAccount';
import { FreightManagerRoutes } from './ShippingManager/routes';




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
            <Switch>
              <Route path='/login' render={()=><LoginPage success={()=>this.setState({isLoggedIn:true})}/>}/>
              <Route path='/createAccount' render={() => <CreateAccount/>} />
              {captainDashRoutes.map(route=>
                <Route key={route.path} {...route}/>)}
              <Route path='/login' render={()=><LoginPage/>}/>
                {captainDashRoutes.map(route=>
                  <Route key={route.path} {...route}/>)}
                {FreightManagerRoutes.map(route=>
                  <Route key={route.path} {...route}/>)}
            </Switch>
            <Redirect from="/" to="/login" />
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

