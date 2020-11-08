import React, { useEffect } from 'react';
import HeaderMenu from './headerMenu';
import '../styles.css';
import { connect } from 'unistore/react';
import { actions } from '../../store';
import { BackTop } from 'antd';
import { withRouter } from 'react-router-dom';

const Header = withRouter(({ location, setCategorias, setSubCategorias, setMarcas }) => {
  useEffect(() => {
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

export default connect('', actions)(Header);