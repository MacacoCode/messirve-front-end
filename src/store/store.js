
import createStore from 'unistore';
import devtools from 'unistore/devtools';

const defaultState = {
  categorias: [],
  subCategorias: [],
  marcas: [],
  cantidadProductoCarrito: 0,
};

const store = devtools(createStore(defaultState));

export default store;