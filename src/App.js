import React from 'react';
import CoinsFromMarket from './CoinsFromMarket';                  // For the cryptocurrency in general
import './App.css';                                                // Styles
import { HashRouter as Router, Route, Routes } from 'react-router-dom';    // Used to help enable dynamic routing in the app
import Coin from './Coin';                                      // Individual coins by ID

function App() {
  return (
    <Router>
      <div>
      <Routes>
      <Route path='/' element={ <CoinsFromMarket />} />              {/*  To render the cryptocurrency in general */}
      <Route path='/coin/:id' element={ <Coin />} />                {/*   To render individual cryptocurrency details by ID */}
      </Routes>
    </div>
    </Router> 
  );
}
export default App;
