import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

const EmpresaOrdenes = ({user}) => {
  const [orders, setOrders] = useState([]);
  const columns = []

  useEffect(() => {
    fetch(`http://localhost:8000/api/productoorden?idEmpresa=${user.empresa}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={orders} />
    </>
  );
};

export default EmpresaOrdenes;
