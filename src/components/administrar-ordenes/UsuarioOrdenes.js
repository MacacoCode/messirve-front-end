import { Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../../store';


const UsuarioOrdenes = ({ user, setAltDetalle }) => {
    const [orders, setOrders] = useState([]);

    const handleVerProductos = (record) => {
      // const found = orders.find((o) => o.no_Orden === record.no_Orden);
      setAltDetalle({...record, /*id: found.id*/})
    }
    const columns = [
        {
            title: 'No Orden',
            dataIndex: 'no_Orden',
            key: 'no_Orden',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Fecha de Ingreso',
            dataIndex: 'fecha_ingreso',
            key: 'fecha_ingreso',
        },
        {
            title: 'Impuesto',
            dataIndex: 'impuesto',
            key: 'impuesto',
        },
        {
            title: 'Sub-Total',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Acción',
            key: 'accion',
            render: (text, record) => (
                <Space size="middle">
                  <Link onClick={() => handleVerProductos(record)} to={`/orden/resumen-orden/${record.id}`}>Ver Productos</Link>
                </Space>
              )
        }
    ]
  
    useEffect(() => {
      fetch(`http://localhost:8000/api/orden?idUsuario=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data)
        })
    }, []);
  
    return (
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }}>
        <Table columns={columns} dataSource={orders} />
      </div>
    );
};

export default connect('', actions)(UsuarioOrdenes);
