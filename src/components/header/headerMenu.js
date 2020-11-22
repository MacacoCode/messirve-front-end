import React, { useState } from 'react';
import { Menu, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import SearchBar from './searchBar';
import logo from '../../img/logo.png'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import Login from '../authentication/Login';
import Regiser from '../authentication/Register';
import { actions } from '../../store';
import { isEmpty } from 'lodash';

const { SubMenu } = Menu;

const HeaderMenu = ({
  location, categorias, subCategorias, setFilterActual,
  user, setUser
}) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const history = useHistory();

  const handleLoginClick = () => {
    if (loginVisible === false) setLoginVisible(true);
  };
  const logout = () => {
    localStorage.removeItem('messirve-shop-user')
    setUser({})
    message.info('Se ha cerrado sesión correctamente')
  }

  const buscarSubCategoria = (categoria, subCategoria) => {
    setFilterActual([categoria, subCategoria]);
    history.push(`/search/producto/categoria=${categoria}/subcategoria=${subCategoria}`);
  };
  const buscarCategoria = (categoria) => {
    // history.push(`/search/producto/categoria=${categoria}`)
  };

  return (
    <div>
    <Menu selectedKeys={[location.pathname]} defaultSelectedKeys={['home']} mode="horizontal" theme="light">
      <Menu.Item key="logo" style={{ float: 'left' }}>
        <img src={logo} alt="Logo" width="120" height="auto" />
      </Menu.Item>
      <Menu.Item key="/home" style={{ float: 'left' }}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <SubMenu title="Categorias" style={{ float: 'left' }}>
        {/*<SubMenu title="Vestimenta">
          <Menu.Item key="setting:1">Calzado</Menu.Item>
          <Menu.Item key="setting:2">Camisas</Menu.Item>
          <Menu.Item key="setting:2">Accesorios</Menu.Item>
        </SubMenu>
        <SubMenu title="Suplementos">
          <Menu.Item key="setting:3">Snacks</Menu.Item>
          <Menu.Item key="setting:4">Proteina</Menu.Item>
        </SubMenu>*/}
        {categorias && categorias.map((categoria) => (
          <SubMenu onTitleClick={() => buscarCategoria(categoria.nombre)} title={categoria.nombre}>
            {subCategorias && subCategorias.filter((subCategoria) => subCategoria.idCategoria === categoria.id)
            .map((subCategoria) => (
            <Menu.Item
              onClick={() => buscarSubCategoria(categoria.nombre, subCategoria.nombre)}
              key={`/${categoria.nombre}/${subCategoria.nombre}`}
            >
              {subCategoria.nombre}
            </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </SubMenu>
      <Menu.Item key="/about" style={{ float: 'left' }}>
        About Us
      </Menu.Item>
      {/*<Menu.Item style={{ width:'50%', marginTop: 10 }}>
        <SearchBar />
      </Menu.Item>*/}
      {!isEmpty(user) && (
        <Menu.Item onClick={logout} key="/logout" style={{ float: 'right' }}>
          Cerrar Sesión
        </Menu.Item>
        )}
      {!isEmpty(user) && (
        <Menu.Item key="/cuenta" style={{ float: 'right' }}>
          <b>Cuenta</b>
        </Menu.Item>
        )}
      {isEmpty(user) && (  
      <Menu.Item onClick={handleLoginClick} key="/login" style={{ float: 'right' }}>
        Iniciar Sesion
        <Login visible={loginVisible} setVisible={setLoginVisible} />
      </Menu.Item>
      )}
      {isEmpty(user) && (
      <Menu.Item key="/registrarse" style={{ float: 'right' }}>
        <Link to="/registrarse">Registrarse</Link>
      </Menu.Item>
      )}
      <Menu.Item key="/carrito" style={{ float: 'right', marginTop: 2 }}>
        <Link to="/carrito">
          <ShoppingCartOutlined style={{ fontSize: '1.4em' }} />
        </Link>
      </Menu.Item>
    </Menu>
    <SearchBar categorias={categorias} subCategorias={subCategorias} />
    </div>
  );
};

export default connect(['categorias', 'subCategorias', 'user'], actions)(HeaderMenu);
