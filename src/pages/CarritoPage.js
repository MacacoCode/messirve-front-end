import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import Carrito from '../components/carrito/Carrito';
import ParaDespues from '../components/carrito/ParaDespues';

const CarritoPage = ({user}) => {
  const history = useHistory();
  if (user.empresa) history.push('/')
  return (
    <div style={{ minHeight: 700 }}>
      <Carrito />
      <ParaDespues />
    </div>
  )
};

export default connect('user')(CarritoPage);
