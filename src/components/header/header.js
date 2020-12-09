import React, { useEffect } from 'react';
import HeaderMenu from './headerMenu';
import '../styles.css';
import { connect } from 'unistore/react';
import { actions } from '../../store';
import { BackTop, message } from 'antd';
import { withRouter } from 'react-router-dom'
import jwt from 'jwt-decode';
import { isEmpty, findIndex, update, isEqual } from 'lodash';

const Header = withRouter(({
  location, setCategorias, setSubCategorias, setMarcas,
  setUser, carrito, detalleCarrito, user, setCarritoItems,
}) => {
  useEffect(() => {
    const userInLocal = localStorage.getItem('messirve-shop-user')
    if (userInLocal) {
      const parsedUser = JSON.parse(userInLocal)
      const decodedUser = jwt(parsedUser.token)
      setUser({...decodedUser, token: parsedUser.token, user: parsedUser.user})
      // actualizamos las ordenes
    }
    fetch('http://localhost:8000/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data));
    fetch('http://localhost:8000/api/subcategorias')
      .then((res) => res.json())
      .then((data) => setSubCategorias(data));
    fetch('http://localhost:8000/api/marcas')
      .then((res) => res.json())
      .then((data) => setMarcas(data));
  }, []);

  useEffect(() => {
    if (!isEmpty(user)) {
      const foundOrden = user.user.orden_set.find((u) => u.estado === 'Carrito')
      if (!isEmpty(foundOrden)) {
        fetch(`http://localhost:8000/api/orden/${foundOrden.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            impuesto: detalleCarrito.impuesto,
            subtotal: detalleCarrito.subTotal,
            total: detalleCarrito.total,
          })
        }).then((res) => res.json())
          .then((data) => {
            if (!data.id) message.error("Hubo un error actualizando el carrito")
            if (data.id) {
              /*let updatedCarrito = []
              for (let i = 0; i < carrito.length; i+=1) {
                if (carrito[i].idOrden !== data.id) {
                  carrito[i].idOrden = data.id
                  updatedCarrito.push(carrito[i])
                }
              }
              if (updatedCarrito) setCarritoItems([...updatedCarrito]); */
              setUser({...user, user: { ...user.user, orden_set: [...user.user.orden_set, data] }})
              localStorage.setItem('messirve-shop-user',
                JSON.stringify({...user, user: { ...user.user, orden_set: [...user.user.orden_set, data] }}) 
              )
            }
          })
      }
    } 
  }, [detalleCarrito]);
  useEffect(() => {
    if (!isEmpty(user)) {
      const foundOrden = user.user.orden_set.find((u) => u.estado === 'Carrito')
      if (!isEmpty(foundOrden)) {
        Promise.all(
          carrito.map((item) => {
            /*fetch(`http://localhost:8000/api/productoorden?idOrden=${foundOrden.id}&idProducto=${item.id}&idEmpresa=${item.empresa.idEmpresa.id}`)
              .then((res) => res.json())
              .then((data1) => {
                const [found] = data1; */
                // const productoOrdenFound = item.producto_orden_set.find((i) => found.idProducto === i.idProducto && found.idEmpresa === i.idEmpresa)
                if (/*productoOrdenFound ||*/ item.idProductoOrden) {
                  fetch(`http://localhost:8000/api/productoorden/${item.idProductoOrden}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      //...productoOrdenFound,
                      ...item,
                      subtotal: item.subTotal,
                      iva: item.impuesto,
                      total: item.total && parseFloat(item.total.toFixed(2))
                    })
                  }).then((res) => res.json())
                    .then((data) => {
                      // if (!data.id) message.error(`Hubo un error actualizando el producto ${item.nombre} en el carrito`)
                      if (data.id) {
                        const foundInCarrito = carrito.find((i) => i.id === data.idProducto)
                        const index = findIndex(carrito, (i) => i.id === data.idProducto);
                        foundInCarrito.producto_orden_set = [...foundInCarrito.producto_orden_set, data];
                        if (!isEqual(carrito[index], foundInCarrito )) {
                          carrito[index] = foundInCarrito;
                          setCarritoItems([...carrito])
                          localStorage.setItem('messirve-shop-carrito',
                            JSON.stringify([...carrito]) 
                          )
                        }
                      }
                    })
                } else {
                  fetch(`http://localhost:8000/api/productoorden`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      ...item,
                      idProducto:item.id,
                      idOrden: foundOrden.id,
                      idEmpresa: item.empresa.idEmpresa.id,
                      subtotal: item.subTotal,
                      iva: item.impuesto,
                      tamanio: item.medida,
                      total: item.total && parseFloat(item.total.toFixed(2))
                    })
                  }).then((res) => res.json())
                    .then((data) => {
                      // if (!data.id) message.error(`Hubo un error actualizando el producto ${item.nombre} en el carrito`)
                      if (data.id) {
                        // const foundInCarrito = carrito.find((i) => i.id === data.idProducto && i.empresa.idEmpresa.id === data.idEmpresa)
                        const index = findIndex(carrito, (i) => i.id === data.idProducto);
                        item.producto_orden_set = [...item.producto_orden_set, data];
                        if (isEqual(carrito[index], item )) {
                          carrito[index] = item;
                          carrito[index].idProductoOrden = data.id
                          setCarritoItems([...carrito])
                          localStorage.setItem('messirve-shop-carrito',
                            JSON.stringify([...carrito]) 
                          )
                        }
                      }
                    })
                }
              // })
            //fetch
          })
        )
      }
    }
  }, [carrito, detalleCarrito]);
  return (
    <div>
      <HeaderMenu location={location} />
      <BackTop />
    </div>
  );
});

export default connect(['carrito', 'detalleCarrito', 'user'], actions)(Header);