import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CantidadSelector = () => {
  const [value, setValue] = useState(1);
  const valueObj = { value: value, label: `Cant...: ${value}` };
  const handleChange = (val) => {
    setValue(val.value);
  };

  return (
    <Select
      labelInValue
      size="small"
      style={{ width: 100 }}
      labelInValue
      value={valueObj}
      onChange={handleChange}
      listHeight={128}
    >
      <Option value={1}>1</Option>
      <Option value={2}>2</Option>
      <Option value={3}>3</Option>
      <Option value={4}>4</Option>
      <Option value={5}>5</Option>
      <Option value={6}>6</Option>
      <Option value={7}>7</Option>
      <Option value={8}>8</Option>
      <Option value={9}>9</Option>
    </Select>
  );
};

export default CantidadSelector;
