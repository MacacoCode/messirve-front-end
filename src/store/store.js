
import createStore from 'unistore';
import devtools from 'unistore/devtools';

const defaultState = {
  categorias: [],
  subCategorias: [],
  marcas: [],
  carrito: JSON.parse(localStorage.getItem('messirve-shop-carrito')) || [],
  paraDespues: JSON.parse(localStorage.getItem('messirve-shop-para-despues')) || [],
  filterActual: [],
  user: {},
  detalleCarrito: JSON.parse(localStorage.getItem('messirve-shop-detalleCarrito')) || {},
  ordenDireccion: {},
  altDetalle: {},
};

const store = devtools(createStore(defaultState));

export default store;