import React, { useEffect } from 'react';
import HeaderMenu from './headerMenu';
import '../styles.css';
import { connect } from 'unistore/react';
import { actions } from '../../store';
import { BackTop, message } from 'antd';
import { withRouter } from 'react-router-dom'
import jwt from 'jwt-decode';
import { isEmpty } from 'lodash';

const Header = withRouter(({
  location, setCategorias, setSubCategorias, setMarcas,
  setUser, carrito, detalleOrden, user,
}) => {
  useEffect(() => {
    const userInLocal = localStorage.getItem('messirve-shop-user')
    if (userInLocal) {
      const parsedUser = JSON.parse(userInLocal)
      const decodedUser = jwt(parsedUser.token)
      setUser({...decodedUser, token: parsedUser.token, user: parsedUser.user})
      // actualizamos las ordenes
    }
    fetch('http://localhost:8000/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data));
    fetch('http://localhost:8000/api/subcategorias')
      .then((res) => res.json())
      .then((data) => setSubCategorias(data));
    fetch('http://localhost:8000/api/marcas')
      .then((res) => res.json())
      .then((data) => setMarcas(data));
  }, []);
  return (
    <div>
      <HeaderMenu location={location} />
      <BackTop />
    </div>
  );
});

export default connect(['carrito', 'detalleOrden', 'user'], actions)(Header);