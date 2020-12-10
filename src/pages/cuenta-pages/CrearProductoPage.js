import { message } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
