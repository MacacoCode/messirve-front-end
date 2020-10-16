import React from 'react';
import "antd/dist/antd.css";
import { Provider } from 'unistore/react';
import { store } from './store'

function App({children}) {
  return (
    <div className="App">
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  );
}

export default App;
