import React from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'unistore/react';
import { message } from 'antd';
import ResumenOrden from '../../components/orden/ResumenOrden';

const ResumenOrdenPage = ({direccion, carrito}) => {
  const history = useHistory();
  if (!isEmpty(direccion)) {
    message.warning('Necesita ingresar una direccion de envío')
    history.push('/orden/direccion');
  }
  if (isEmpty(carrito)) {
    message.warning('No se han encontrado productos en su carrito')
    history.push('/carrito')
  }
  return (
    <>
      <ResumenOrden direccion={direccion} carrito={carrito} />
    </>
  );
};

export default connect(['direccion', 'carrito'])(ResumenOrdenPage);
