import store from './store';

const actions = {
  setCategorias: (_, newCategorias) => ({ categorias: newCategorias }),
  setSubCategorias: (_, newSubCategorias) => ({ subCategorias: newSubCategorias }),
  setMarcas: (_, newMarcas) => ({ marcas: newMarcas }),
  setCarritoItems: (_, newItem) => ({ carrito: newItem}),
  setParaDespuesItems: (_, newItem) => ({ paraDespues: newItem }),
  setCantidadProductoCarrito: (_, cantidad) => ({ cantidadProductoCarrito: cantidad }),
};

export default actions;
