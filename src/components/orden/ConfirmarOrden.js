import { Button, message } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../../store';

const ConfirmarOrden = ({
    orden, productos, direccion,
    user, setCarritoItems, 
}) => {
  const history = useHistory();
  const handleClick = () => {
    fetch(`http://localhost:8000/api/orden`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        estado: 'Orden Abierta',
        impuesto: orden.impuesto,
        subtotal: orden.subtotal || orden.subTotal,
        total: orden.total,
        direccion: {
            first_name: direccion.first_name,
            last_name: direccion.last_name,
            postal: direccion.postal,
            ciudad: direccion.ciudad,
            region: direccion.region,
            direccion: direccion.direccion?.direccion,
            pais: direccion.pais || 'Nicaragua',
            telefono: direccion.telefono
        },
        idUsuario: user.id,
      })
    }).then((res) => res.json())
      .then((data) => {
        Promise.all(
            productos.map((prod) => {
              fetch(`http://localhost:8000/api/productoorden/${prod.idProductoOrden}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  estado: 'Orden Abierta',
                  idOrden: data.id,
                })
              }).then((res) => res.json())
            })
          )
          setCarritoItems([])
          localStorage.removeItem('messirve-shop-carrito')
          localStorage.removeItem('messirve-shop-detalleCarrito')
          history.push('/cuenta/ordenes')
          message.success('Orden Realizada Correctamente')
      })
  };

  return (
    <>
      <Button type="primary" onClick={handleClick}>Confirmar Orden</Button>
    </>
  );
};

export default connect('user', actions)(ConfirmarOrden);
