import { Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

const AñadirProducto = ({empresa}) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const openDropdown = (open) => {
    // setLoading(true);
    if (open === true && isEmpty(productos)) {
      fetch(`http://localhost:8000/api/productos?exclude_empresa=${empresa}`)
        .then((res) => res.json())
        .then((data) => {
          setProductos(data);
          console.log(data)
          // setLoading(false);
        });
    }
  };

  return (
    <>
      <Select showSearch style={{ minWidth: 250, borderRadius: 20 }} loading={loading} onDropdownVisibleChange={openDropdown} placeholder="Añadir Producto">
        {productos.map((producto) => (
          <Select.Option value={producto.id}>
            {producto.nombre}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default AñadirProducto;
