import React from 'react';
import {
  Card, Form, Button, Input, message
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { connect } from 'unistore/react';
import { actions } from '../../store';
import jwt from 'jwt-decode';
import useWindowSize from '../../hooks/useWindowSize';

const Register = ({ visible, setVisible, setUser }) => {
  const windowSize = useWindowSize();

  const submit = async (values) => {
    const nuevoUsuario = await fetch('http://localhost:8000/api/usuario/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }).then((res) => res.json())
      .then((data) => {
        if (typeof data.email === "object") message.error(data.email)
        return data;
      })
    console.log(nuevoUsuario)
    if (nuevoUsuario.id) {
      fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nuevoUsuario.email, password: values.password })
      }).then((res) => res.json())
        .then((data) => {
            if (data.token) {
            setVisible(false)
            setTimeout(() => {
                message.success("Ha ingresado a su cuenta correctamente!")
                const decodedUser = jwt(data.token)
                setUser({...decodedUser, token: data.token, user: data.user})
                localStorage.setItem('messirve-shop-user', JSON.stringify(data))
            }, 1000)
            }
            if (data.detail) message.error(data.detail)
        })
    }
  }

  return (
    <div
      style={{ textAlign: '-webkit-center' }}
    >
        <Card title="Registrarse" style={{ width: windowSize.width < 480 ? '100%' : 450 }}>
          <Form
            onFinish={submit}
          >
            <Form.Item
                label="Primer Nombre"
                name="first_name"
                rules={[{ required: true, message: 'Este campo es requirido' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Primer Apellido"
                name="last_name"
                rules={[{ required: true, message: 'Este campo es requirido' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Telefono"
                name="telefono"
                rules={[{ required: true, message: 'Este campo es requirido' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="E-Mail"
                name="email"
                rules={[{ required: true, message: 'Por favor ingrese su E-Mail' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="E-Mail" />
            </Form.Item>

            <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: 'Por favor ingrese su Contraseña!' }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
          </Form>
        </Card>
    </div>
  );
};

export default connect('', actions)(Register);
