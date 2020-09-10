import React from 'react';
import { Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import SearchBar from './searchBar';
import logo from '../../img/logo.png'

const { SubMenu } = Menu;

const HeaderMenu = () => {
  return (
    <Menu mode="horizontal" theme="light">
      <Menu.Item key="logo" style={{ float: 'left' }}>
        <img src={logo} alt="Logo" width="120" height="auto" />
      </Menu.Item>
      <Menu.Item key="home" style={{ float: 'left' }}>
        Home
      </Menu.Item>
      <SubMenu title="Fitness" style={{ float: 'left' }}>
        <Menu.ItemGroup title="Vestimenta">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Suplementos">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="about" style={{ float: 'left' }}>
        About
      </Menu.Item>
      <Menu.Item style={{ width: '50%', marginTop: 10 }}>
        <SearchBar />
      </Menu.Item>
      <Menu.Item key="logIn" style={{ float: 'right' }}>
        Log In
      </Menu.Item>
      <Menu.Item key="signIn" style={{ float: 'right' }}>
        Sign In
      </Menu.Item>
      <Menu.Item key="shoppingCart" style={{ float: 'right' }}>
        <ShoppingCartOutlined />
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
