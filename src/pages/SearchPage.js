import React, { useEffect, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import SearchFilters from '../components/search/SearchFilters';
import { useParams } from 'react-router-dom';
import Post from '../components/post';
import { findIndex } from 'lodash';

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
        fetch(`http://localhost:8000/api/productos?${params.subcategoria}&${params.producto?.replace('producto', 'search')}`)
          .then((res) => res.json())
          .then((data) => setFoundProductos(data));
      }
    }
  }, [params]);

  return(
    <div style={{ minHeight: 700 }}>          
      <Col span={3}>
        <SearchFilters setFoundProductos={setFoundProductos} />
      </Col>
      <Row>
        <Col offset={3}>
          <Row>
            {foundProductos ? foundProductos.map((producto) => (
              <Col span={7}>
                <Post
                  noHeight
                  producto={producto}
                  id={producto.id}
                  title={producto.nombre}
                  description={producto.descripcion}
                  marca={producto.marca?.nombre}
                  image={producto.imagenes_set[0]?.imagen}
                  medidas={producto.tallaproducto_set}
                />
              </Col>
            )) : <Spin />}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
