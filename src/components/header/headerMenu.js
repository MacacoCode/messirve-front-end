import React, { useState } from 'react';
import { Menu, message, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import SearchBar from './searchBar';
import logo from '../../img/logo.png'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import Login from '../authentication/Login';
import { actions } from '../../store';
import { isEmpty } from 'lodash';
import MenuItem from 'antd/lib/menu/MenuItem';

const { SubMenu } = Menu;

const HeaderMenu = ({
  location, categorias, subCategorias, setFilterActual,
  user, setUser, carrito,
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
        {categorias && categorias.map((categoria) => (
          <SubMenu onTitleClick={() => buscarCategoria(categoria.nombre)} title={categoria.nombre}>
            {subCategorias && subCategorias.filter((subCategoria) => subCategoria.idCategoria.id === categoria.id)
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
        Nosotros
      </Menu.Item>
      {!isEmpty(user) && (
        <Menu.Item onClick={logout} key="/logout" style={{ float: 'right' }}>
          Cerrar Sesión
        </Menu.Item>
        )}
      {!isEmpty(user) && (
        <SubMenu title="Cuenta" key="/cuenta" style={{ float: 'right' }}>
          <Menu.Item key="/cuenta/ordenes">
            <Link to="/cuenta/ordenes">
              Ordenes
            </Link>
          </Menu.Item>
          <Menu.Item key="/cuenta/productos">
            <Link to="/cuenta/productos">
              Administrar Productos
            </Link>
          </Menu.Item>
        </SubMenu>
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
      {!user.empresa && (
        <Menu.Item key="/carrito" style={{ float: 'right', marginTop: 2 }}>
          <Link to="/carrito">
            <Badge size="small" style={{ backgroundColor: '#52c41a' }} count={carrito.length}>
              <ShoppingCartOutlined style={{ fontSize: '1.4em' }} />
            </Badge>
          </Link>
        </Menu.Item>
      )}
    </Menu>
    <SearchBar categorias={categorias} subCategorias={subCategorias} />
    </div>
  );
};

export default connect(['categorias', 'subCategorias', 'user', 'carrito'], actions)(HeaderMenu);
