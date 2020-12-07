import React from 'react';
import "antd/dist/antd.css";
import { Provider } from 'unistore/react';
import { store } from './store'

function App({children}) {
  //localStorage.removeItem('messirve-shop-detalleCarrito')
  //localStorage.removeItem('messirve-shop-carrito')
  //localStorage.removeItem('messirve-shop-para-despues')
  return (
    <div className="App">
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  );
}

export default App;
