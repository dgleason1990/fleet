import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from 'App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { ProductPage } from 'components/products/productPage';
import { TransactionsPage } from 'components/transactions/transactionsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },{
    path: "/products",
    element: <ProductPage/>
  },{
    path: "/transactions",
    element: <TransactionsPage/>
  }
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
