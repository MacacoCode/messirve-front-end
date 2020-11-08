import React, { useEffect, useState } from 'react';
import Post from '../post';
import { useParams } from 'react-router-dom';
import { Col } from 'antd';
// import useWindowSize from './hooks/'

const Producto = () => {
  const params = useParams();
  const [producto, setProducto] = useState();
  // const size = useWindowSize();

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
