import React, { useEffect, useState } from 'react';
import { Col, Tag } from 'antd';

const { CheckableTag } = Tag;

const TagMedidas = ({ medidas, selectedEmpresa, setSelectedMedida }) => {
  const [medida, setMedida] = useState(medidas && medidas ? [medidas[0]?.idtalla.id]: []);
  const [thisMedidas, setThisMedidas] = useState(medidas);
  const handleChange = (me, checked) => {
    if (checked) {
        setMedida([me.idtalla.id])
        setSelectedMedida(me)
    } /*else {
        setSelectedMedida([])
    }*/

  };

  useEffect(() => {
    if (selectedEmpresa && medidas) {
      const filteredMedidas = medidas.filter((m) => m.idEmpresa === selectedEmpresa.idEmpresa.id)
      setThisMedidas(filteredMedidas)
      setMedida([filteredMedidas[0]?.idtalla.id])
      setSelectedMedida(filteredMedidas[0])
    }
  }, [selectedEmpresa])
  return (
    <>
        {thisMedidas?.map((me) => (
        <CheckableTag
            key={me.idtalla.id}
            checked={medida.indexOf(me.idtalla.id) > -1}
            onChange={checked => handleChange(me, checked)}
        >
            {me.idtalla.tamanio}
        </CheckableTag>
        ))}
    </>
  );
};

export default TagMedidas;
