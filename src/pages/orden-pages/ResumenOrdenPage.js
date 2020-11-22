import React from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'unistore/react';
import { message } from 'antd';
import ResumenOrden from '../../components/orden/ResumenOrden';

const ResumenOrdenPage = ({user, carrito, ordenDireccion}) => {
  const history = useHistory();
  if (isEmpty(ordenDireccion)) {
    message.warning('Necesita comprobar direccion de envío')
    history.push('/orden/direccion');
  }
  if (isEmpty(carrito)) {
    message.warning('No se han encontrado productos en su carrito')
    history.push('/carrito')
  }
  return (
    <>
      <ResumenOrden user={user} carrito={carrito} />
    </>
  );
};

export default connect(['user', 'carrito', 'ordenDireccion'])(ResumenOrdenPage);
