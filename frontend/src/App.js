import React from 'react';
import './App.css';
import { ShipCreationForm, CrewList } from './ShippingManager';
import { ShippingManager } from './ShippingManager/models';


function App() {

  let mgr = new ShippingManager();

  return (
    <main>
      <CrewList ship={mgr.ships[0]} addCrewMember={crew=>mgr.ships[0].crew.push(crew)}/>
    </main>
  );
}

export default App;
