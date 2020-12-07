import React from 'react';
import Carrito from '../components/carrito/Carrito';
import ParaDespues from '../components/carrito/ParaDespues';

const CarritoPage = () => {

  return (
    <div style={{ minHeight: 700 }}>
      <Carrito />
      <ParaDespues />
    </div>
  )
};

export default CarritoPage;
