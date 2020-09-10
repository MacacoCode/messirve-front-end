import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import PostGrid from './components/postGrid';
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Header />
      <h1 style={{ textAlign:'center', marginTop:'5%' }}>Messirve Shop</h1>
      <PostGrid />
      <Footer />
    </div>
  );
}

export default App;
