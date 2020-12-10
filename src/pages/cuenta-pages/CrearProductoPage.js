import React from 'react';
import { connect } from 'unistore/react';
import CrearProducto from '../../components/administrar-productos/CrearProducto';

const CrearProductoPage = ({user}) => {
  return (
    <>
      <CrearProducto user={user} />
    </>
  );
};

export default connect('user')(CrearProductoPage);
