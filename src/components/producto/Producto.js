import React, { useEffect, useState } from 'react';
import Post from '../post';
import { useParams } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';

const Producto = () => {
  const params = useParams();
  const [producto, setProducto] = useState();
  const windowSize = useWindowSize();

  console.log(producto)
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
      <div style={{ width: windowSize.width > 500 ? 400 : 300,  display: 'flex', justifyContent: 'center', margin: 'auto' }}>
        <Post
          noHeight
          producto={producto}
          title={producto.nombre}
          description={producto.descripcion}
          marca={producto.marca?.nombre}
          image={producto.imagenes_set[0]?.imagen}
          medidas={producto.tallaproducto_set}
        />
     </div>
    ) : (null)
  );
};

export default Producto;
