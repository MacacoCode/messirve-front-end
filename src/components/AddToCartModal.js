import React from 'react';
import { Modal, message, Form } from 'antd';
import CantidadSelector from './carrito/CantidadSelector';
import { isEmpty, isEqual } from 'lodash';
import { connect } from 'unistore/react';
import { actions } from '../store';

const AddToCartModal = ({
  visible, setVisible, producto, cantidadProductoCarrito,
  carrito, setCarritoItems,
}) => {
  const addToCart = () => {
    /* fetch('http://localhost:8000/api/orden')
    .then((res) => res.json())
    .then((data) => console.log(data)) */
    const localCarrito = JSON.parse(localStorage.getItem('messirve-shop-carrito'));
    producto.cantidad = cantidadProductoCarrito;
    if (localCarrito && !isEmpty(carrito)) {
      const findInLocalCarrito = localCarrito.find((item) => isEqual(item, producto));
      const findInCarrito = carrito.find((item) => isEqual(item, producto));
      console.log(producto)
      if (!findInLocalCarrito || !findInCarrito) {
        localStorage.setItem('messirve-shop-carrito' , JSON.stringify([...carrito, producto]));
        setCarritoItems([...carrito, producto]);
        message.success("Producto añadido al Carrito!")
      } else {
        message.info("Producto ya esta en el carrito");
      }
    } else {
      setCarritoItems([...carrito, producto]);
      localStorage.setItem('messirve-shop-carrito', JSON.stringify([producto]));
      message.success("Producto añadido al Carrito")
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
      <Form.Item label="Cantidad"><CantidadSelector /></Form.Item>
    </Modal>
  );
}

export default connect(['cantidadProductoCarrito', 'carrito'], actions)(AddToCartModal);
