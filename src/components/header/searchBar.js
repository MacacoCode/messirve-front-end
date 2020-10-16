import React from 'react';
import { Input, Cascader, Row, Col } from 'antd';
import '../styles.css';

const { Search } = Input;
 
const SearchBar = ({ categorias, subCategorias }) => {
  let options = [{ value: "Todo", label: "Todo" }];

  if (categorias) {
    options = options.concat(categorias.map((categoria) => ({
      value: categoria.nombre,
      label: categoria.nombre,
      children:
        subCategorias && subCategorias.filter((subCategoria) => subCategoria.idCategoria === categoria.id)
        .map((subCategoria) => ({
        value: subCategoria.nombre,
        label: subCategoria.nombre
        }))
    })));
  }

  return (
    <Row>
      <Col offset={5}>
        <Cascader
          options={options}
          expandTrigger="hover"
          defaultValue={["Todo"]}
          style={{ width: '6em' }}
          allowClear={false}
        />
      </Col>
      <Col span={12}>
        <Search
          style={{ textAlign:'center' }}
          placeholder="Busca Lo Que Quieras!"
          enterButton
        />
      </Col>
    </Row>
  );
};

export default SearchBar;
