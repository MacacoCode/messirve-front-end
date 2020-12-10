import { Button, Card, Form, Input, InputNumber, message, Select, Image, Spin } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'unistore/react';
import SubirImagen from './SubirImagen';

const CrearProducto = ({ user, subCategorias }) => {
  const [marcas, setMarcas] = useState([]);
  const [producto, setProducto] = useState({});
  const [form] = Form.useForm();
  const params = useParams();
  const history = useHistory();

  const getMarcas = () => {
    fetch('http://localhost:8000/api/marcas')
      .then((res) => res.json())
      .then((data) => setMarcas(data))
  };

  const selectMarca = (value) => {
    form.setFieldsValue({ marca: value })
  };

  const selectSubcategoria = (values) => {
    form.setFieldsValue({ subcategorias: values })
  };

  const setImagen = (img) => {
    form.setFieldsValue({ imagen: img })
  };

  const administrarProducto = (values) => {
    if (params.idProducto) {
      fetch(`http://localhost:8000/api/empresaproducto/${params.idProducto}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then((res) => res.json())
        .then((data) => data.id && message.success('Producto editado correctamente'))
        .catch((e) => message.error('Hubo un error editando el producto'))
    } else {
      fetch('http://localhost:8000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: values.nombre,
          codigoProducto: values.codigoProducto,
          descripcion: values.descripcion,
          tipoMaterial: values.tipoMaterial,
          marca: values.marca,
          subcategorias: values.subcategorias
        })
      }).then((res) => res.json())
        .then((data) => {
          const imagen = new FormData();
          imagen.append('imagen', values.imagen);
          imagen.append('idProducto', data.id);
          fetch('http://localhost:8000/api/imagenes', {
            method: 'POST',
            body: imagen 
          }).then((res) => res.json());
          fetch('http://localhost:8000/api/empresaproducto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idEmpresa: user.empresa,
              idProducto: data.id,
              cantidad: values.cantidad,
              precioBase: values.precioBase
            })
          }).then((res) => res.json())
            .then((data1) => data1.id && message.success('Producto creado correctamente!'))
            .catch((e) => message.error('Hubo un error al crear el producto'))
        })
    }
  };

  useEffect(() => {
    if (params.idProducto) {
      fetch(`http://localhost:8000/api/empresaproducto/${params.idProducto}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.detail || (data.idEmpresa?.id !== user.empresa)) {
            message.info("No se ha encontrado el producto para administrar")
            history.push('/cuenta/productos')
          } else {
            form.setFieldsValue({ precioBase: data.precioBase })
            form.setFieldsValue({ cantidad: data.cantidad })
            fetch(`http://localhost:8000/api/productos/${data.idProducto?.id}`)
              .then((res) => res.json())
              .then((data1) => setProducto(data1))
          }
        });
    }
  }, [])

  if (params.idProducto && isEmpty(producto)) return <Spin />

  return (
    <div style={{ display: 'flex', placeContent: 'center', maxWidth: 500, margin: 'auto' }}>
      <Card style={{ textAlign:'-webkit-center', width: '100%' }} title="Crear Producto">
        <Form form={form} onFinish={administrarProducto}>
          {params.idProducto ? (
          <>
            <Image height='50%' width='50%' src={producto.imagenes_set[0].imagen} alt="producto-imagen" />
            <h2>{producto.nombre}</h2>
          </>
          ) : (
          <>
            <Form.Item rules={[{ required: true, message: 'Se necesita una imagen' }]} name="imagen">
              <SubirImagen setImagen={setImagen} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Se necesita un codigo' }]}  label="Codigo" name="codigoProducto">
              <Input size="small" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Se necesita un nombre' }]}  label="Nombre" name="nombre">
              <Input size="small" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Se necesita una descripcion' }]}  label="Descripcion" name="descripcion">
              <Input.TextArea size="small" />
            </Form.Item>
          </>
          )}
          <Form.Item rules={[{ required: true, message: 'Se necesita un precio base' }]}  label="Precio Base C$" name="precioBase">
            <InputNumber min={1} prefix="C$" size="small" />
          </Form.Item>
          <Form.Item rules={[{ required: true, message: 'Se necesita una cantidad de existencia' }]}  label="Existencia" name="cantidad">
            <InputNumber min={1} size="small" />
          </Form.Item>
          {params.idProducto ? (
            null
          ) : (
          <>
            <Form.Item rules={[{ required: true, message: 'Se necesita este campo' }]}  label="Tipo de Material" name="tipoMaterial">
              <Input size="small" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Se necesita una marca' }]}  label="Marca" name="marca">
              <Select showSearch optionFilterProp="children" onSelect={selectMarca} style={{ maxWidth: 300 }} size="small" onDropdownVisibleChange={getMarcas}>
                {marcas.map((marca) => (
                  <Select.Option value={marca.id}>{marca.nombre}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Se necesita al menos una subcategoria' }]}  label="SubCategorias" name="subcategorias">
              <Select showSearch optionFilterProp="children" mode="multiple" onChange={selectSubcategoria} style={{ maxWidth: 300 }} size="small">
                {subCategorias.map((subcategoria) => (
                  <Select.Option value={subcategoria.id}>{subcategoria.nombre}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
          )}
          <Form.Item>
            {params.idProducto ? (
              <Button shape="round" type="primary" htmlType="submit">Editar</Button>
            ) : (
              <Button shape="round" style={{ backgroundColor: '#1a991c', borderColor: '#1a991c' }} type="primary" htmlType="submit">Crear</Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default connect('subCategorias')(CrearProducto);
