import React, { useEffect } from 'react';
import { Menu } from 'antd'
import { connect } from 'unistore/react';

const SearchFilters = ({ categorias, subCategorias, marcas }) => {

  return(
    <>
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
        <Menu.ItemGroup key="subcategoria-menu" title="Marcas">
            {marcas && marcas.map((marca) => (
                <Menu.Item key={marca.id}>{marca.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    </>
  );
};

export default connect(['categorias', 'subCategorias', 'marcas'])(SearchFilters);
