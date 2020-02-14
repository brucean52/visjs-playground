import React from 'react';
import { entityFromJSON } from './util/data-conversion';
import NetworkGraph from './components/network-graph';
import model1 from './assets/model1'
import './App.css';


const App = () => {
  console.log('model1', model1);
  console.log('model convert', entityFromJSON(model1));
  return (
    <>
      <NetworkGraph payload={entityFromJSON(model1)}/>
    </>
  );
}

export default App;
