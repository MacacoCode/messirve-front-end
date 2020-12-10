import {
  Button, message, Row, Table, Select,
  Space, Input
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
import { findIndex, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

const EmpresaOrdenes = ({user}) => {
  const [orders, setOrders] = useState([]);
  const [empresa, setEmpresa] = useState({});
  // const [filtro, setFiltro] = useState("Ningun Filtro");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const procesarOrden = (record) => {
    setLoading(true);
    fetch(`http://localhost:8000/api/productoorden/${record.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        estado: 'En Proceso',
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.estado === 'En Proceso') {
          const index = findIndex(orders, (order) => order.id === data.id);
          orders[index].estado = data.estado;
          setOrders(orders)
          setLoading(false)
          message.success(`${record.producto.nombre} en Orden ${record.no_Orden} está En Proceso!!!`)
        }
      })
  };

  const cerrarOrden = (record) => {
    setLoading(true)
    const now = new Date();
    const nowISO = now.toISOString();
    fetch(`http://localhost:8000/api/productoorden/${record.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        estado: 'Orden Cerrada',
        fecha_entrega: nowISO,
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.estado === 'Orden Cerrada') {
          const index = findIndex(orders, (order) => order.id === data.id);
          orders[index].estado = data.estado;
          setOrders(orders)
          setLoading(false)
          message.success(`${record.producto.nombre} en Orden ${record.no_Orden} fue entregado!!!`)
        }
      })
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setLoading(false)
  }

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

  const columns = [
    {
      title: 'No Orden',
      dataIndex: 'no_Orden',
      key: 'no_Orden',
    },
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'producto',
      ...getColumnSearchProps('producto', 'nombre', 'nombre'),
      render: (producto) => (
        <>
          <Row>Codigo - {producto?.codigoProducto}</Row>
          <Row>Nombre - {producto?.nombre}</Row>
          {producto.tamanio && <Row>Medida - {producto.tamanio}</Row>}
        </>
      )
    },
    {
      title: 'Precio Individual',
      dataIndex: 'precio',
      key: 'precio',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Impuesto',
      dataIndex: 'iva',
      key: 'iva',
      render: (dato) => (`C$${dato}`)
    },
    {
      title: 'Sub-Total',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (dato) => (`C$${dato}`)
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (dato) => (`C$${dato}`)
    },
    {
      title: 'Direccion De Envío',
      dataIndex: 'direccion',
      key: 'direccion',
      ...getColumnSearchProps('direccion', 'last_name', 'apellido'),
      render: (direc) => (
        <>
          <Row>
            Cliente - {`${direc?.first_name} ${direc?.last_name}`}
          </Row>
          <Row>
            Direccion - {direc?.direccion}
          </Row>
          <Row>
            Ciudad - {direc?.ciudad}
          </Row>
          {direc?.region && (
            <Row>
              Region - {direc?.region}
            </Row>
          )}
          <Row>
            Postal - {direc?.postal}
          </Row>
          <Row>
            Telefono - {direc?.telefono}
          </Row>
        </>
      )
    },
    {
      title: 'Fecha de Ingreso',
      dataIndex: 'fecha_ingreso',
      key: 'fecha_ingreso',
      filtered: true,
    },
    {
      title: 'Accion de Estado',
      dataIndex: 'estado',
      key: 'estado',
      filters: [
        { text: 'Orden Abierta', value: 'Orden Abierta' },
        { text: 'En Proceso', value: 'En Proceso' },
        { text: 'Orden Cerrada', value: 'Orden Cerrada' },
      ],
      onFilter: (value, record) => record.estado.indexOf(value) === 0,
      render: (text, record) => (
        <>
          {(record.estado === 'Carrito' || record.estado === 'Orden Abierta') && (
            <Button onClick={() => procesarOrden(record)} type="primary" shape="round">Procesar Orden</Button>
          )}
          {record.estado === 'En Proceso' && (
            <Button style={{backgroundColor: '#1a991c', borderColor: '#1a991c'}} onClick={() => cerrarOrden(record)} type="primary" shape="round">Cerrar Orden</Button>
          )}
          {record.estado === 'Orden Cerrada' && (
            <span>Fecha de Entrega {record.fecha_entrega}</span>
          )}
      </>
      )
    }
  ]

  useEffect(() => {
    fetch(`http://localhost:8000/api/productoorden?idEmpresa=${user.empresa}`)
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        Promise.all(
          data.map((productoOrden) => {
            fetch(`http://localhost:8000/api/productos/${productoOrden.idProducto}`)
              .then((res) => res.json())
              .then((data1) => {
                fetch(`http://localhost:8000/api/orden/${productoOrden.idOrden}`)
                  .then((res) => res.json())
                  .then((data2) => {
                    const index = findIndex(data, (dato) => dato.idProducto === data1.id)
                    data[index].producto = data1;
                    data[index].no_Orden = data2.no_Orden;
                    data[index].direccion = data2.direccion;
                    data[index].fecha_ingreso = data2.fecha_ingreso;
                    arr = [...arr, data[index]]
                    setOrders(arr)
                    setLoading(false)
                  })
              })
          })
        )
      })
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/empresa/${user.empresa}`)
      .then((res) => res.json())
      .then((data) => setEmpresa(data))
  }, []);

  // if (isEmpty(orders)) return <Spin />

  return (
    <>
      <h1 style={{ textAlign: '-webkit-center', paddingTop: 20 }}>{empresa.nombre}</h1>
      <h2 style={{ textAlign: '-webkit-center', padding: 20 }}>Usuario: {user.first_name} {user.last_name}</h2>
      <Table loading={loading} onChange={handleTableChange} size="small" columns={columns} dataSource={orders} />
    </>
  );
};

export default EmpresaOrdenes;
