import { message } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import DireccionOrden from '../../components/orden/DireccionOrden';
import { actions } from '../../store';

const DireccionPage = ({setDireccion, direccion, carrito}) => {
  const history = useHistory();
  if (isEmpty(carrito)) {
    message.warning('No se han encontrado productos en su carrito')
    history.push('/carrito')
  }
  return (
    <>
      <DireccionOrden setDireccion={setDireccion} direccion={direccion} />
    </>
  );
};

export default connect(['direccion', 'carrito'], actions)(DireccionPage);
