import { ScrollView, VStack, useToast } from 'native-base';
import { removeData, retrieveData } from '../../utils/funcoes/localStorage';
import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards/Cards';
import { IResultadoCalculado } from '../../interfaces/IResultadoCalculado';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';

export default function Historico() {

  //#region hooks
  const [resultados, setResultados] = useState<Array<IResultadoCalculado>>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if(isFocused)
      buscarHistorico();
  }, [isFocused])

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: 'Histórico',
      headerRight: () => (
        <MaterialCommunityIcons name='trash-can-outline' size={22} style={{ marginRight: 18 }} onPress={() => handleLimparHistorico()} />
      ),
    })
  }, []);
  //#endregion

  //#region handles
  function handleLimparHistorico(): void {
    Alert.alert('Excluir', 'Deseja excluir o histórico de conversões?', [{ text: 'Ok', onPress: () => limparHistorico() }, { text: 'Cancel' }]);
  }
  //#endregion

  //#region functions
  function limparHistorico(): void {
    removeData('historico');
    buscarHistorico();
  }

  async function buscarHistorico() {
    const data = await retrieveData<Array<IResultadoCalculado>>('historico');
    if (data)
      setResultados(data);
    else
      setResultados([]);
  }
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

  
}
