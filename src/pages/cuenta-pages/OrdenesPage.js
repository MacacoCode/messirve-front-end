import { isEmpty } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';

const OrdenesPage = ({user}) => {
  const history = useHistory();
  if(isEmpty(user)) history.push('/')
  return (
    <>
      {user.empresa ? (
        <p>Empresa</p>
      ) : (
        <p>Usuario</p>
      )}
    </>
  );
};

export default connect(['user'])(OrdenesPage);
