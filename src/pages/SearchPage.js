import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import SearchFilters from '../components/search/SearchFilters';
import { useParams } from 'react-router-dom';
import Post from '../components/post';

const SearchPage= () => {
  const params = useParams();
  const [foundProductos, setFoundProductos] = useState();
  useEffect(() => {
    if (params && params.producto) {
      if (!params.categoria && !params.subcategoria) {
        fetch(`http://localhost:8000/api/productos?${params.producto?.replace('producto', 'search')}`)
          .then((res) => res.json())
          .then((data) => setFoundProductos(data));
      }
      else if (params.categoria && params.subcategoria) {
        fetch(`http://localhost:8000/api/productos?${params.subcategoria.replace('=','s=')}&${params.producto?.replace('producto', 'search')}`)
          .then((res) => res.json())
          .then((data) => setFoundProductos(data));
      }
    }
  }, [params]);

  return(
    <>
      <Row>
        <Col span={4}>
          <SearchFilters />
        </Col>
        {foundProductos && foundProductos.map((producto) => (
          <Col span={6}>
            <Post
              producto={producto}
              id={producto.id}
              title={producto.nombre}
              description={producto.descripcion}
              marca={producto.marca?.nombre}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SearchPage;
