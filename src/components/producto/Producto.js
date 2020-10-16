import React, { useEffect, useState } from 'react';
import Post from '../post';
import { useParams } from 'react-router-dom';
import { connect } from 'unistore/react';
import { isEmpty } from 'lodash';
import { Col } from 'antd';

const Producto = ({ marcas }) => {
  const params = useParams();
  const [producto, setProducto] = useState();
  const [marca, setMarca] = useState(); 

  useEffect(() => {
    if (params.productoId && !isEmpty(marcas)) {
      fetch(`http://localhost:8000/api/productos/${params.productoId}`)
        .then((res) => res.json())
        .then((data) => {
          setProducto(data);
          console.log(marcas.find((m) => m.id === data.idMarca))
          setMarca(marcas.find((m) => m.id === data.idMarca));
        });
    }
  }, [params.productoId, marcas]);

  return(
    producto && marca ? (
      <Col offset={9} span={6}>
        <Post
            title={producto.nombre}
            description={producto.descripcion}
            marca={marca.nombre}
        />
     </Col>
    ) : (null)
  );
};

export default connect('marcas')(Producto);
