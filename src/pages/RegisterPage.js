import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import Register from '../components/authentication/Register';

const RegisterPage = ({user}) => {
  const history = useHistory();

  if (user.token) history.push('/')
  return (
    <div style={{ minHeight: 700 }}>
      <Register />
    </div>
  );
};

export default connect('user')(RegisterPage);
