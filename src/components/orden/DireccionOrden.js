import React from 'react';
import {
    Button,
  Card, Col, Divider, Form, Input,
  Row, Select, Tooltip
} from 'antd';
import countries from "countries-list";

const countryCodes = Object.keys(countries.countries);
const countryNames = countryCodes.map(code => countries.countries[code].name);

const DireccionOrden = () => {
  const handleFinish = (values) => {
    console.log(values)
  };

  return (
    <>
      <Divider />
      <Row>
        <Col offset={7} span={10}>
          <Card title="Establecer una Direccion">
            <Form onFinish={handleFinish}>
                <Form.Item name="pais" label="Pais o Region">
                    <Select disabled showSearch defaultValue={countryNames.find((country) => country === "Nicaragua")}>
                        {countryNames.map((country) => (
                          <Select.Option value={country}>{country}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} label="Nombre Completo" name="nombreCompleto">
                    <Input />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} label="Nombre de la calle" name="direccion">
                    <Input placeholder="Nombre de la calle, nombre de la empresa" />
                    <Input placeholder="Departamente, piso, unidad, edificio, etc" />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} name="ciudad" label="Ciudad">
                  <Input />
                </Form.Item>
                <Form.Item name="region" label="Region">
                  <Input />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} name="codigoPostal" label="Postal">
                  <Input />
                </Form.Item>
                <Tooltip placement="bottom" title="Se puede utilizar para ayudar a la entrega">
                  <Form.Item rules={[{ required: true, message: 'Este campo es requerido!' }]} name="telefono" label="Numero de Telefono">
                    <Input />
                  </Form.Item>
                </Tooltip>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button htmlType="submit" shape="round" type="primary">
                        Usar esta dir
                    </Button>
                </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DireccionOrden;
