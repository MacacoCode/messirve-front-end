import React from 'react';
import { Col } from 'antd';
import SearchFilters from '../components/search/SearchFilters';

const SearchPage= () => {
  return(
    <Col span={4}>
      <SearchFilters />
    </Col>
  );
};

export default SearchPage;
