import store from './store';

const actions = {
  setCategorias: (_, newCategorias) => ({ categorias: newCategorias }),
  setSubCategorias: (_, newSubCategorias) => ({ subCategorias: newSubCategorias }),
  setMarcas: (_, newMarcas) => ({ marcas: newMarcas }),
};

export default actions;
