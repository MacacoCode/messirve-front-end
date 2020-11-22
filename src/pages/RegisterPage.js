import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import Register from '../components/authentication/Register';

const RegisterPage = ({user}) => {
  const history = useHistory();

  if (user.token) history.push('/')
  return (
    <>
      <Register />
    </>
  );
};

export default connect('user')(RegisterPage);
