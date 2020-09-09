import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const HeaderMenu = () => {
  return (
    <Menu mode="horizontal" theme="light">
        <Menu.Item key="logo">
        Logo
        </Menu.Item>
        <Menu.Item key="home">
        Home
        </Menu.Item>
        <SubMenu title="Fitness">
        <Menu.ItemGroup title="Vestimenta">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Suplementos">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="logIn" style={{ float: 'right' }}>
        Log In
        </Menu.Item>
        <Menu.Item key="signIn" style={{ float: 'right' }}>
        Sign In
        </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
