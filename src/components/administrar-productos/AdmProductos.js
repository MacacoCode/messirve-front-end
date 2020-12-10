import { Button, Col, Divider, Input, Row, Select, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { findIndex, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import AñadirProducto from './AñadirProducto';
import { useHistory } from 'react-router-dom';

const AdmProductos = ({ user }) => {
  const [productos, setProductos] = useState([]);
  const [empresa, setEmpresa] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const history = useHistory();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex, propKey, labelKey) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          /*ref={node => {
            this.searchInput = node
          }}*/
          placeholder={`Search ${dataIndex} ${labelKey}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#fcb131' : undefined }} />,
    onFilter: (value, record) => {
      let filter = record[dataIndex];
      if (record[dataIndex][propKey]) {
        filter = record[dataIndex][propKey]
        return filter.toString().toLowerCase().includes(value.toLowerCase())
      }
      if (record[dataIndex]) {
        filter = record[dataIndex]
        return filter.toString().toLowerCase().includes(value.toLowerCase())
      }
      return '';
    },
    /*onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },*/
    /*render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),*/
  });

  const borrarProducto = (record) => {
    console.log(record);
  };

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'producto',
      ...getColumnSearchProps('producto', 'nombre', 'nombre'),
      render: (producto) => (
        <>
          <Row>Codigo - {producto?.codigoProducto}</Row>
          <Row>Nombre - {producto?.nombre}</Row>
          <Row>Imagen - <a target="_blank" rel="noopener noreferrer" href={producto?.imagenes_set[0]?.imagen}>{producto?.imagenes_set[0]?.imagen}</a></Row>
          {producto?.tallaproducto_set[0] && (
            <Row>Medidas - {producto.tallaproducto_set.map((talla) => <span>{talla.idtalla.tamanio}<Divider type="vertical" /></span>)}</Row>
          )}
        </>
      )
    },
    {
      title: 'Precio',
      dataIndex: 'precioBase',
      key: 'precioBase',
      render: (dato) => (`C$${dato}`)
    },
    {
      title: 'Existencia',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Descripcion',
      dataIndex: 'producto',
      key: 'descripcion',
      ...getColumnSearchProps('producto', 'descripcion', 'descripcion'),
      render: (producto) => (producto?.descripcion)
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button onClick={() => history.push(`/cuenta/productos/administrar/${record.id}`)} type="primary" shape="round">Editar</Button>
            {/*<Button onClick={() => borrarProducto(record)} type="primary" danger shape="round">Desactivar</Button>*/}
          </Space>
        </>
      )
    }
  ]

  useEffect(() => {
    if (!isEmpty(user)) {
      setLoading(true)
      fetch(`http://localhost:8000/api/empresaproducto?idEmpresa=${user.empresa}`)
        .then((res) => res.json())
        .then((data) => {
          let arr = []
          // setProductos(data)
          Promise.all(
            data.map((prod) => {
              fetch(`http://localhost:8000/api/productos/${prod.idProducto.id}`)
                .then((res) => res.json())
                .then((data1) => {
                  const index = findIndex(data, (dato) => dato.idProducto.id === data1.id)
                  data[index].producto = data1; 
                  arr = [...arr, data[index]];
                  setProductos(arr)
                  setLoading(false)
                })
            }) 
          )
        })
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(user)) {
      fetch(`http://localhost:8000/api/empresa/${user.empresa}`)
        .then((res) => res.json())
        .then((data) => setEmpresa(data))
    }
  }, []);
  return (
    <>
      <h1 style={{ textAlign: '-webkit-center', paddingTop: 20 }}>{empresa.nombre}</h1>
      <h2 style={{ textAlign: '-webkit-center', padding: 20 }}>Usuario: {user.first_name} {user.last_name}</h2>
      <div style={{ float: 'right' }}>
        <AñadirProducto empresa={user.empresa} />
      </div>
      <Table loading={loading} columns={columns} dataSource={productos}  />
    </>
  );
};

export default AdmProductos;
