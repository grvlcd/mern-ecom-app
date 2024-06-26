import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import HomePage from './pages/Home';
import ProductDetailsPage from './pages/ProductDetails';
import { Provider } from 'react-redux';
import store from './store';
import CartPage from './pages/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/product/:id' element={<ProductDetailsPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
