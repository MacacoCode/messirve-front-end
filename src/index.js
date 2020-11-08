import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Spin } from 'antd'

const HomePage = React.lazy(() => import('./pages/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const ProductoPage = React.lazy(() => import('./pages/ProductoPage'));
const CarritoPage = React.lazy(() => import('./pages/CarritoPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Suspense fallback={<Spin />}>
        <Router>
          <Header />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route path="/search/:producto?/:categoria?/:subcategoria?" component={SearchPage} />
            <Route path="/producto/:productoId?" component={ProductoPage} />
            <Route path="/carrito" component={CarritoPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
          <Footer />
        </Router>
      </Suspense>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
