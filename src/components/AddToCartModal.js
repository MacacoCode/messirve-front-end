import React from 'react';
import { Modal } from 'antd';
import CantidadSelector from './carrito/CantidadSelector';
import { isEqual } from 'lodash';
import { connect } from 'unistore/react';

const AddToCartModal = ({ visible, setVisible, producto, cantidadProductoCarrito }) => {
  const addToCart = () => {
    /* fetch('http://localhost:8000/api/orden')
    .then((res) => res.json())
    .then((data) => console.log(data)) */
    const localCarrito = JSON.parse(localStorage.getItem('messirve-shop-carrito'));
    producto.cantidad = cantidadProductoCarrito;
    if (localCarrito) {
      const findInCarrito = localCarrito.find((item) => isEqual(item, producto));
      if (!findInCarrito) {
        localStorage.setItem('messirve-shop-carrito' , JSON.stringify([...localCarrito, producto]));
      } else {
        console.log("Producto ya en el carrito");
      }
    } else {
      localStorage.setItem('messirve-shop-carrito', JSON.stringify([producto]));
    }
    setVisible(false)
  };

  return (
    <Modal
      visible={visible}
      onOk={addToCart}
      onCancel={() => setVisible(false)}
      width={300}
    >
      <CantidadSelector />
    </Modal>
  );
}

export default connect('cantidadProductoCarrito')(AddToCartModal);
