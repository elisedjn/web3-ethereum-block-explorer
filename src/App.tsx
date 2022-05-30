import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Address from './Pages/Address';
import AllTransactions from './Pages/AllTransactions';
import BlockPage from './Pages/Block';
import Home from './Pages/Home';
import Transaction from './Pages/Transaction';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/block/:blockNb' element={<BlockPage />} />
        <Route path='/tx/:txNb' element={<Transaction />} />
        <Route path='/txsPerBlock/:blockNb' element={<AllTransactions />} />
        <Route path='/address/:addressNb' element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
