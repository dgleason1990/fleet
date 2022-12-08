import React from 'react';
import { BrowserRouter as Switch, createBrowserRouter, Route,  useNavigate } from 'react-router-dom'
import './App.css';
import { ProductPage } from 'components/products/productPage';
import { TransactionsPage } from 'components/transactions/transactionsPage';
import { Button } from '@mui/material';


function App() {
  let navigate = useNavigate()

  return (
    <div className="App">
      <Button onClick={() => navigate('/transactions')}> Transactions Page</Button>
      <Button onClick={()=> navigate('/products')}> Products Page</Button>
    </div>
  );
}

export default App;
