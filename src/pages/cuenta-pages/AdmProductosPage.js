import React from 'react';
import { connect } from 'unistore/react';
import AdmProductos from '../../components/administrar-productos/AdmProductos';

const AdmProductosPage = ({user}) => {
  return (
    <>
        <AdmProductos user={user} />
    </>
  );
};

export default connect('user')(AdmProductosPage);
