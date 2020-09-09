import React from 'react';
import { Input } from 'antd';
import '../styles.css';

const { Search } = Input;
 
const SearchBar = () => {

  return (
    <Search
      style={{ textAlign:'center' }}
      placeholder="Search Whatever The Fuck You Fucking Want"
      enterButton
    />
  );
};

export default SearchBar;
