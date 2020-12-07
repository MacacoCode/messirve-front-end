import { message } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import DireccionOrden from '../../components/orden/DireccionOrden';
import { actions } from '../../store';

const DireccionPage = ({setUser, user, carrito}) => {
  const history = useHistory();
  if (isEmpty(carrito)) {
    message.warning('No se han encontrado productos en su carrito')
    history.push('/carrito')
  }
  if(isEmpty(user)) {
    message.info('Por favor Inicie Sesion para proceder a ordenar')
    history.push('/carrito')
  }
  return (
    <div style={{ minHeight: 700 }}>
      <DireccionOrden user={user} />
    </div>
  );
};

export default connect(['user', 'carrito'], actions)(DireccionPage);
