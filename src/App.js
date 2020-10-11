import React from 'react';
import Header from './components/header/header';
import "antd/dist/antd.css";

function App({children}) {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
}

export default App;
