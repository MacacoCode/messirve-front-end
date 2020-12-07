import { isEmpty } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import EmpresaOrdenes from '../../components/administrar-ordenes/EmpresaOrdenes';
import UsuarioOrdenes from '../../components/administrar-ordenes/UsuarioOrdenes';

const OrdenesPage = ({user}) => {
  const history = useHistory();
  if(isEmpty(user)) history.push('/')
  return (
    <div style={{ minHeight: 700 }}>
      {user.empresa ? (
        <EmpresaOrdenes user={user} />
      ) : (
        <UsuarioOrdenes user={user} />
      )}
    </div>
  );
};

export default connect(['user'])(OrdenesPage);
