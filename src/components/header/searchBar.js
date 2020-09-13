import React from 'react';
import { Input } from 'antd';
import '../styles.css';

const { Search } = Input;
 
const SearchBar = () => {

  return (
    <Search
      style={{ textAlign:'center' }}
      placeholder="Busca Lo Que Quieras!"
      enterButton
    />
  );
};

export default SearchBar;
