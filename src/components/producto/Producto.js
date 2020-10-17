import React, { useEffect, useState } from 'react';
import Post from '../post';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Col } from 'antd';

const Producto = () => {
  const params = useParams();
  const [producto, setProducto] = useState();

  useEffect(() => {
    if (params.productoId) {
      fetch(`http://localhost:8000/api/productos/${params.productoId}`)
        .then((res) => res.json())
        .then((data) => {
          setProducto(data);
        });
    }
  }, [params.productoId]);

  return(
    producto ? (
      <Col offset={9} span={6}>
        <Post
            title={producto.nombre}
            description={producto.descripcion}
            marca={producto.marca?.nombre}
        />
     </Col>
    ) : (null)
  );
};

export default Producto;
