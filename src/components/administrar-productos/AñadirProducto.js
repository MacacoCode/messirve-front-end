import { Button, Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ModalAñadirProducto from './ModalAñadirProducto';

const CrearProductoButton = ({history}) => (
  <div style={{ textAlign: '-webkit-center' }}>
    <Button 
      onClick={() => history.push('/cuenta/productos/crear')}
      type="dashed"
      size="small"
    >
      Crear Producto
    </Button>
  </div>
);

const AñadirProducto = ({empresa}) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, openModal] = useState({ open: false });
  const history = useHistory();
  const openDropdown = (open) => {
    // setLoading(true);
    if (open === true && isEmpty(productos)) {
      fetch(`http://localhost:8000/api/productos?exclude_empresa=${empresa}`)
        .then((res) => res.json())
        .then((data) => {
          setProductos(data);
        });
    }
  };

  return (
    <>
      <Select
        showSearch
        style={{ minWidth: 250, borderRadius: 20 }}
        loading={loading}
        onDropdownVisibleChange={openDropdown}
        placeholder="Añadir Producto"
        optionFilterProp="children"
        onSelect={(value) => openModal({ open: true, value })}
        dropdownRender={(menu) => (
          <>
            {menu}
            <ModalAñadirProducto modal={modal} openModal={openModal} />
            <CrearProductoButton history={history} />
          </>
        )}
      >
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
