import React from 'react';
import { Col } from 'antd';
import SearchFilters from '../components/search/SearchFilters';
import { useParams } from 'react-router-dom';

const SearchPage= () => {
  const params = useParams();
  console.log(params)
  return(
    <Col span={4}>
      <SearchFilters />
    </Col>
  );
};

export default SearchPage;
