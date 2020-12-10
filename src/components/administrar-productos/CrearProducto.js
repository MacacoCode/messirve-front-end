import { Button, Card, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { connect } from 'unistore/react';

const CrearProducto = ({ user, subCategorias }) => {
  const [marcas, setMarcas] = useState([]);
  const [form] = Form.useForm();

  const getMarcas = () => {
    fetch('http://localhost:8000/api/marcas')
      .then((res) => res.json())
      .then((data) => setMarcas(data))
  };

  const selectMarca = (value) => {
    // form.setFields([{ name: 'marca',value }])
    console.log(value)
    form.setFieldsValue({ marca: value })
  };

  const selectSubcategoria = (values) => {
    console.log(values)
    form.setFieldsValue({ subcategorias: values })
  };

  const crearProducto = (values) => {
    fetch('http://localhost:8000/api/productos', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        ...values
      })
    }).then((res) => res.json())
    
  };

  return (
    <div style={{ display: 'flex', placeContent: 'center', maxWidth: 500, margin: 'auto' }}>
      <Card style={{ textAlign:'-webkit-center', width: '100%' }} title="Crear Producto">
        <Form form={form} onFinish={crearProducto}>
          <Form.Item label="Imagen" name="imagen">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Codigo" name="codigoProducto">
            <Input size="small" />
          </Form.Item>
          <Form.Item label="Nombre" name="nombre">
            <Input size="small" />
          </Form.Item>
          <Form.Item label="Descripcion" name="descripcion">
            <Input.TextArea size="small" />
          </Form.Item>
          <Form.Item label="Precio Base" name="precioBase">
            <InputNumber min={1} prefix="C$" size="small" />
          </Form.Item>
          <Form.Item label="Existencia" name="cantidad">
            <InputNumber min={1} size="small" />
          </Form.Item>
          <Form.Item label="Tipo de Material" name="tipoMaterial">
            <Input size="small" />
          </Form.Item>
          <Form.Item label="Marca" name="marca">
            <Select showSearch optionFilterProp="children" onSelect={selectMarca} style={{ maxWidth: 300 }} size="small" onDropdownVisibleChange={getMarcas}>
              {marcas.map((marca) => (
                <Select.Option value={marca.id}>{marca.nombre}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="SubCategoria" name="subcategorias">
            <Select showSearch optionFilterProp="children" mode="multiple" onChange={selectSubcategoria} style={{ maxWidth: 300 }} size="small">
              {subCategorias.map((subcategoria) => (
                <Select.Option value={subcategoria.id}>{subcategoria.nombre}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button shape="round" style={{ backgroundColor: '#1a991c', borderColor: '#1a991c' }} type="primary" htmlType="submit">Crear</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default connect('subCategorias')(CrearProducto);
