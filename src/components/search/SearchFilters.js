import React from 'react';
import {
  Menu, Rate,
} from 'antd'
import { connect } from 'unistore/react';
import PriceRange from './PriceRange';

const SearchFilters = ({ categorias, subCategorias, marcas }) => {

  return(
    <div id="search-filters" style={{ position: 'fixed' }}>
    <Menu multiple mode="inline" selectable={false}>
        <Menu.ItemGroup key="rango-precios" title="Precio">
            {/*<Menu.Item key="price-range">*/
              <PriceRange checkable />
        /*</Menu.Item>*/}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple mode="inline">
        <Menu.ItemGroup key="categoria-menu" title="Categorias">
            {categorias && categorias.map((categoria) => (
              <Menu.Item key={categoria.id}>{categoria.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple mode="inline">
        <Menu.ItemGroup key="subcategoria-menu" title="SubCategorias">
            {subCategorias && subCategorias.map((subCategoria) => (
                <Menu.Item key={subCategoria.id}>{subCategoria.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple mode="inline">
        <Menu.ItemGroup key="marcas-menu" title="Marcas">
            {marcas && marcas.map((marca) => (
                <Menu.Item key={marca.id}>{marca.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple mode="inline" selectable={false}>
       <Menu.ItemGroup key="rating" title="Rating">
            <Menu.Item key="rating-component">
                <Rate allowHalf defaultValue={0} />
            </Menu.Item>
        </Menu.ItemGroup>
    </Menu>
    </div>
  );
};

export default connect(['categorias', 'subCategorias', 'marcas'])(SearchFilters);
