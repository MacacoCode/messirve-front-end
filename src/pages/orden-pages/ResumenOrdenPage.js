import React from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'unistore/react';
import { message } from 'antd';
import ResumenOrden from '../../components/orden/ResumenOrden';

const ResumenOrdenPage = ({user, carrito, ordenDireccion, altDetalle}) => {
  const history = useHistory();
  if (isEmpty(ordenDireccion) && isEmpty(altDetalle)) {
    message.warning('Necesita comprobar direccion de envío')
    history.push('/orden/direccion');
  }
  if (isEmpty(carrito) && isEmpty(altDetalle)) {
    message.warning('No se han encontrado productos en su carrito')
    history.push('/carrito')
  }
  return (
    <div style={{ minHeight: 700 }}>
      <ResumenOrden user={user} carrito={carrito} altDetalle={altDetalle} />
    </div>
  );
};

export default connect(['user', 'carrito', 'ordenDireccion', 'altDetalle'])(ResumenOrdenPage);
