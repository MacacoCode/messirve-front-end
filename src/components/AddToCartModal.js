import React from 'react';
import { Modal, message, Form } from 'antd';
import CantidadSelector from './carrito/CantidadSelector';
import { isEmpty, isEqual } from 'lodash';
import { connect } from 'unistore/react';
import { actions } from '../store';

const AddToCartModal = ({
  visible, setVisible, producto, selectedEmpresa, selectedCantidad, selectedMedida,
  carrito, setCarritoItems,
}) => {
  const addToCart = () => {
    /* fetch('http://localhost:8000/api/orden')
    .then((res) => res.json())
    .then((data) => console.log(data)) */
    const localCarrito = JSON.parse(localStorage.getItem('messirve-shop-carrito'));
    producto.cantidad = selectedCantidad;
    producto.empresa = selectedEmpresa;
    producto.medida = selectedMedida;
    if (localCarrito && !isEmpty(carrito)) {
      const findInLocalCarrito = localCarrito.find((item) => isEqual(item, producto));
      const findInCarrito = carrito.find((item) => isEqual(item, producto));
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
    > <h3><b>¿Desea Agregar {producto && producto.nombre} al Carrito?</b></h3></Modal>
  );
}

export default connect(['carrito'], actions)(AddToCartModal);
