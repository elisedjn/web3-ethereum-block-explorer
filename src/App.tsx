import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Address from './Pages/Address';
import BlockPage from './Pages/Block';
import Home from './Pages/Home';
import Transaction from './Pages/Transaction';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='block' element={<div>Blocks</div>}>
            <Route index element={<div>Choose a block</div>} />
            <Route path=':blockNb' element={<BlockPage />} />
          </Route>
          <Route path='tx' element={<div>Transactions</div>}>
            <Route index element={<div>Choose a transaction</div>} />
            <Route path=':txNb' element={<Transaction />} />
          </Route>
          <Route path='address' element={<div>Addresses</div>}>
            <Route index element={<div>Choose an address</div>} />
            <Route path=':addressNb' element={<Address />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
