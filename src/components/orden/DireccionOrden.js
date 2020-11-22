import React, { useEffect, useState } from 'react';
import {
  Button,
  Card, Checkbox, Col, Divider, Form, Input,
  Row, Select, Tooltip, message
} from 'antd';
import countries from "countries-list";
import { connect } from 'unistore/react';
import { actions } from '../../store';
import jwt from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const countryCodes = Object.keys(countries.countries);
const countryNames = countryCodes.map(code => countries.countries[code].name);

const DireccionOrden = ({user, setUser, setOrdenDireccion}) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [isDefault, setIsDefault] = useState();

  const handleFinish = async (values) => {
    const parsedDireccion = {
      direccion: values.direccion,
      ciudad: values.ciudad,
      region: values.region,
      postal: values.postal,
    };
    const payload = {
      ...values,
      direccion: parsedDireccion,
    };
    await setOrdenDireccion({...user, ...payload})
    if (values.default === true) {
      await fetch(`http://localhost:8000/api/usuario/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({direccion: parsedDireccion})
      }).then((res) => res.json())
      fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: values.password})
      }).then((res) => res.json())
        .then((data) => {
          if (data.token) {
            const decodedUser = jwt(data.token)
            setUser({...decodedUser, token: data.token})
            localStorage.setItem('messirve-shop-user', JSON.stringify(data))
            message.info("Direccion predeterminada actualizada")
          }
          if (data.detail) message.error(data.detail)
        })
    }
    history.push('/orden/resumen-orden')
  };

  useEffect(() => {
    form.setFields([
      { name: 'first_name', value: user.first_name },
      { name: 'last_name', value: user.last_name },
      { name: 'direccion', value: user.direccion?.direccion },
      { name: 'ciudad', value: user.direccion?.ciudad },
      { name: 'region', value: user.direccion?.region },
      { name: 'postal', value: user.direccion?.postal },
      { name: 'telefono', value: user.telefono }
    ])
  }, [])

  return (
    <>
      <Divider />
      <Row>
        <Col offset={7} span={10}>
          <Card title="Establece una Direccion">
            <Form form={form} onFinish={handleFinish}>
                <Form.Item name="pais" label="Pais o Region">
                    <Select disabled showSearch defaultValue={countryNames.find((country) => country === "Nicaragua")}>
                        {countryNames.map((country) => (
                          <Select.Option value={country}>{country}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} label="Primer Nombre" name="first_name">
                    <Input />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} label="Primer Apellido" name="last_name">
                    <Input />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} label="Direccion" name="direccion">
                    <Input />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} name="ciudad" label="Ciudad">
                  <Input />
                </Form.Item>
                <Form.Item name="region" label="Region">
                  <Input />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} name="postal" label="Postal">
                  <Input />
                </Form.Item>
                <Tooltip placement="right" title="Se puede utilizar para ayudar a la entrega">
                  <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} name="telefono" label="Numero de Telefono">
                    <Input />
                  </Form.Item>
                </Tooltip>
                <Tooltip placement="right" title="Los nombres y telefono no se ven afectados al seleccionar esta opcion">
                  <Form.Item label="¿Desea usar esta direccion por defecto?" name="default">
                    <Checkbox 
                      onChange={(val) => {
                        form.setFields([{name: 'default', value: val.target.checked}])
                        setIsDefault(val.target.checked)
                      }}
                    />
                  </Form.Item>
                </Tooltip>
                {isDefault === true && (
                  <Form.Item rules={[{ required: true, message: 'Introduzca su contraseña!' }]} name="password" label="Contraseña">
                    <Input.Password />
                  </Form.Item>
                )}
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button htmlType="submit" shape="round" type="primary">
                        Usar Direccion
                    </Button>
                </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect('', actions)(DireccionOrden);
