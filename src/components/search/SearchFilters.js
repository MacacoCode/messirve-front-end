import React, { useState } from 'react';
import {
  Menu, Rate,
} from 'antd'
import { connect } from 'unistore/react';
import PriceRange from './PriceRange';

const SearchFilters = ({ categorias, subCategorias, marcas, setFoundProductos, foundProductos }) => {
  const [selectedSubcategorias, setSelectedSubcategorias] = useState([]);
  const [selectedMarcas, setSelectedMarcas] = useState([]);
  // const [precioRango, setPrecioRango] = useState([]);
  const filterBySubcategoria = (elo, props) => {
    let subcat;
    console.log(props)
    if (elo === "add") {
      subcat = props.item.props.children[1];
      setSelectedSubcategorias([props.key]);
    }
    if (elo === "rest") {
      subcat = "";
      setSelectedSubcategorias([]);
    }
    fetch(`http://localhost:8000/api/productos?subcategoria=${subcat}`)
      .then((res) => res.json())
      .then((data) => setFoundProductos(data));
  };

  const filterByMarca = (elo, props) => {
    let subcat;
    if (elo === "add") {
      subcat = props.item.props.children[1];
      setSelectedMarcas([props.key]);
    }
    if (elo === "rest") {
      subcat = "";
      setSelectedMarcas([]);
    }
    fetch(`http://localhost:8000/api/productos?marca=${subcat}`)
      .then((res) => res.json())
      .then((data) => setFoundProductos(data));
  }

  const filterByRango = (min, max) => {
    if (min && max) {
      fetch(`http://localhost:8000/api/productos?minimo=${min}&maximo=${max}`)
        .then((res) => res.json())
        .then((data) => setFoundProductos(data));
    }
  }


  return(
    <div id="search-filters" style={{ position: 'fixed' }}>
    <Menu multiple mode="inline" selectable={false}>
        <Menu.ItemGroup key="rango-precios" title="Precio">
            {/*<Menu.Item key="price-range">*/
              <PriceRange filterByRango={filterByRango} /*precioRango={precioRango} setPrecioRango={setPrecioRango}*/ checkable />
        /*</Menu.Item>*/}
        </Menu.ItemGroup>
    </Menu>
    {/*<Menu multiple mode="inline">
        <Menu.ItemGroup key="categoria-menu" title="Categorias">
            {categorias && categorias.map((categoria) => (
              <Menu.Item key={categoria.id}>{categoria.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>*/}
    <Menu multiple selectedKeys={selectedSubcategorias} onSelect={(props) => filterBySubcategoria ("add", props)} onDeselect={(props) => filterBySubcategoria("rest", props)} mode="inline">
        <Menu.ItemGroup key="subcategoria-menu" title="SubCategorias">
            {subCategorias && subCategorias.map((subCategoria) => (
                <Menu.Item key={subCategoria.id}>{subCategoria.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple selectedKeys={selectedMarcas} onSelect={(props) => filterByMarca ("add", props)} onDeselect={(props) => filterByMarca("rest", props)} mode="inline">
        <Menu.ItemGroup key="marcas-menu" title="Marcas">
            {marcas && marcas.map((marca) => (
                <Menu.Item key={marca.id}>{marca.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    {/*<Menu mode="inline" selectable={false}>
       <Menu.ItemGroup key="rating" title="Calificación">
            <Menu.Item key="rating-component">
                <Rate allowHalf defaultValue={0} />
            </Menu.Item>
        </Menu.ItemGroup>
    </Menu>*/}
    </div>
  );
};

export default connect(['categorias', 'subCategorias', 'marcas'])(SearchFilters);
