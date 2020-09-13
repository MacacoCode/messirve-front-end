import React from 'react';
import { Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import SearchBar from './searchBar';
import logo from '../../img/logo.png'

const { SubMenu } = Menu;

const HeaderMenu = () => {
  return (
    <Menu defaultSelectedKeys={['home']} mode="horizontal" theme="light">
      <Menu.Item key="logo" style={{ float: 'left' }}>
        <img src={logo} alt="Logo" width="120" height="auto" />
      </Menu.Item>
      <Menu.Item key="home" style={{ float: 'left' }}>
        Home
      </Menu.Item>
      <SubMenu title="Fitness" style={{ float: 'left' }}>
        <Menu.ItemGroup title="Vestimenta">
          <Menu.Item key="setting:1">Calzado</Menu.Item>
          <Menu.Item key="setting:2">Camisas</Menu.Item>
          <Menu.Item key="setting:2">Accesorios</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Suplementos">
          <Menu.Item key="setting:3">Snacks</Menu.Item>
          <Menu.Item key="setting:4">Proteina</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="about" style={{ float: 'left' }}>
        About Us
      </Menu.Item>
      <Menu.Item style={{ width: '50%', marginTop: 10 }}>
        <SearchBar />
      </Menu.Item>
      <Menu.Item key="logIn" style={{ float: 'right' }}>
        Iniciar Sesion
      </Menu.Item>
      <Menu.Item key="signIn" style={{ float: 'right' }}>
        Registrarse
      </Menu.Item>
      <Menu.Item disabled key="shoppingCart" style={{ float: 'right', marginTop: 2 }}>
        <ShoppingCartOutlined style={{ fontSize: '1.4em' }} />
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
