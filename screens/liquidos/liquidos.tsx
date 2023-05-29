import { Text, Center, Button, Input, Select, VStack, useToast } from 'native-base';
import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { EUnidadeLiquido } from '../../enums/EUnidadeLiquido';
import { EUnidadePeso } from '../../enums/EUnidadePeso';
import { converterLiquidoPara, formatarNumero } from '../../utils/funcoes/conversoes';
import IResultadoCalculado from '../../interfaces/IResultadoCalculado';
import { validar, calcular, definirMensagem } from './funcoes';
import { retrieveData, storeData } from '../../utils/funcoes/localStorage';
import { getFrase } from '../../utils/funcoes/frases';

export default function Liquidos(): JSX.Element {
  //#region hooks
  const toast = useToast();

  const [naReceitaEsta, setNaReceitaEsta] = useState<number>(0);
  const [paraCada, setParaCada] = useState<number>(0);
  const [vouFazer, setVouFazer] = useState<number>(0);

  const [naReceitaEstaUnidade, setNaReceitaEstaUnidade] = useState<EUnidadeLiquido>(EUnidadeLiquido.Nenhum);
  const [paraCadaUnidade, setParaCadaUnidade] = useState<EUnidadePeso>(EUnidadePeso.Nenhum);
  const [vouFazerUnidade, setVouFazerUnidade] = useState<EUnidadePeso>(EUnidadePeso.Nenhum);

  const [loading, setLoading] = useState<boolean>(false);

  //#endregion

  //#region onFunctions
  function onChangeNaReceitaEsta(text: string): void {
    text = formatarNumero(text);
    setNaReceitaEsta(Number(text));
  }

  function onChangeVouFazer(text: string): void {
    setVouFazer(Number(text));
  }

  function onChangeParaCada(text: string): void {
    setParaCada(Number(text));
  }

  function onChangeNaReceitaEstaUnidade(text: string): void {
    setNaReceitaEstaUnidade(Number(text));
  }

  function onChangeParaCadaUnidade(value: string) {
    setParaCadaUnidade(Number(value));
  }

  function onChangeVouFazerUnidade(value: string) {
    setVouFazerUnidade(Number(value));
  }

  async function onPressCalcular(): Promise<void> {
    setLoading(true);
    await handleCalcular();
    setLoading(false);
  }
  //#endregion

  function showToast(message: any, duration = 3500): void {
    toast.show({ description: message, duration: duration, size: '2/6' })
  }

  //#region handles
  async function handleCalcular(): Promise<void> {
    const obj: IResultadoCalculado = {
      naReceitaEstaUnidade: naReceitaEstaUnidade,
      naReceitaEsta: naReceitaEsta,
      paraCadaUnidade: paraCadaUnidade,
      paraCada: paraCada,
      vouFazerUnidade: vouFazerUnidade,
      vouFazer: vouFazer,
    };

    if (validar(obj)) {
      const resultadoCalculado = calcular(obj);
      const mensagemResultadoCalculado = definirMensagem(resultadoCalculado, naReceitaEstaUnidade, naReceitaEstaUnidade);
      const objResultado: IResultadoCalculado = {
        tipo: 'liquido',
        litros: converterLiquidoPara(resultadoCalculado, naReceitaEstaUnidade, EUnidadeLiquido.Litro),
        mililitros: converterLiquidoPara(resultadoCalculado, naReceitaEstaUnidade, EUnidadeLiquido.Mililitro),
        naReceitaEsta: naReceitaEsta,
        naReceitaEstaUnidade: naReceitaEstaUnidade,
        paraCada: paraCada,
        paraCadaUnidade: paraCadaUnidade,
        vouFazer: vouFazer,
        vouFazerUnidade: vouFazerUnidade
      };

      const resultadosAnteriores = await retrieveData<Array<IResultadoCalculado>>('historico');
      console.log(resultadosAnteriores, '########');
      storeData('historico', [...resultadosAnteriores, objResultado]);

      alert(mensagemResultadoCalculado);
      showToast(getFrase());
    } else {
      alert('Faltou preencher algum campo, loira', 'Erro');
    }
  }

  //#endregion

  const alert = (mensagem = '', title = 'Tu vai precisar de...') => Alert.alert(title, mensagem, [{ text: 'Ok' }]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <VStack
            flex={1}
          >

            <VStack mb={5}>
              <VStack mx={12} my={5}>
                <Text fontSize='lg' mb={3}>
                  Na receita está...
                </Text>
                <VStack>
                  <Input
                    type='text'
                    placeholder='Insira a quantidade'
                    keyboardType='decimal-pad'
                    onChangeText={onChangeNaReceitaEsta}
                    w='xs'
                    size='lg'
                    mb={2}
                  />

                  <Select onValueChange={onChangeNaReceitaEstaUnidade} placeholder='Selecione' w='xs'>
                    <Select.Item label='Litro' value={EUnidadeLiquido.Litro.toString()} />
                    <Select.Item label='Mililitro' value={EUnidadeLiquido.Mililitro.toString()} />
                  </Select>

                  <Text fontSize='lg' my={3}>
                    Para cada...
                  </Text>

                  <Input
                    placeholder='Insira a quantidade'
                    keyboardType='decimal-pad'
                    onChangeText={onChangeParaCada}
                    w='xs'
                    size='lg'
                    mb={2}
                  />

                  <Select onValueChange={onChangeParaCadaUnidade} placeholder='Selecione' w='xs'>
                    <Select.Item label='Kilograma' value={EUnidadePeso.Kilograma.toString()} />
                    <Select.Item label='Grama' value={EUnidadePeso.Grama.toString()} />
                    <Select.Item label='Miligrama' value={EUnidadePeso.Miligrama.toString()} />
                  </Select>

                </VStack>
                <VStack>
                  <Text fontSize='lg' my={3}>
                    E eu vou fazer...
                  </Text>
                  <Input
                    placeholder='Insira a quantidade'
                    keyboardType='decimal-pad'
                    onChangeText={onChangeVouFazer}
                    w='xs'
                    size='lg'
                    mb={2}
                  />

                  <Select onValueChange={onChangeVouFazerUnidade} placeholder='Selecione' w='xs'>
                    <Select.Item label='Kilograma' value={EUnidadePeso.Kilograma.toString()} />
                    <Select.Item label='Grama' value={EUnidadePeso.Grama.toString()} />
                    <Select.Item label='Miligrama' value={EUnidadePeso.Miligrama.toString()} />
                  </Select>
                </VStack>
              </VStack>
            </VStack>

            <Center>
              <Button
                w='xs'
                size='lg'
                onPress={onPressCalcular}
                disabled={loading}
              >
                Vai caralho
              </Button>
            </Center>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}