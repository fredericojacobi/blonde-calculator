import { ScrollView, VStack } from 'native-base';
import { retrieveData } from '../../utils/funcoes/localStorage';
import IResultadoCalculado from '../../interfaces/IResultadoCalculado';
import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards/Cards';

export default function Historico() {

  //#region hooks
  const [resultados, setResultados] = useState<Array<IResultadoCalculado>>([]);

  useEffect(() => {
    buscarHistorico();
  }, [])

  //#endregion
  
  return (
    <VStack
      flex={1}
    >
      <ScrollView
        onScrollEndDrag={buscarHistorico}
      >
        <Cards resultados={resultados} />
      </ScrollView>
    </VStack>
  );

  async function buscarHistorico() {
    const data = await retrieveData<Array<IResultadoCalculado>>('historico');
    console.log(data, '##########################');
    if (data) {
      setResultados(data);
    } else {
      setResultados([]);
    }
  }
}
