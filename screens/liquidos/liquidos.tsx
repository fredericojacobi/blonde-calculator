import { Text, Center, Button, Input, Select, VStack, useToast } from 'native-base';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { EUnidadeLiquido } from '../../enums/EUnidadeLiquido';
import { EUnidadePeso } from '../../enums/EUnidadePeso';
import { converterLiquidoPara, formatarNumero } from '../../utils/funcoes/conversoes';
import { IResultadoCalculado, IResultadoCalculadoLiquido } from '../../interfaces/IResultadoCalculado';
import { validarLiquidos, definirMensagemLiquidos, calcularLiquidos } from './funcoes';
import { retrieveData, storeData } from '../../utils/funcoes/localStorage';
import { getFrase } from '../../utils/funcoes/frases';
import { ETipo } from '../../enums/ETipo';
import { showToast } from '../../utils/funcoes/toast';

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

  function onPressLimparCampos(): void {
    setParaCada(0);
    setVouFazer(0);
    setNaReceitaEsta(0);
    setVouFazer(0);
    setVouFazerUnidade(EUnidadePeso.Nenhum);
    setParaCadaUnidade(EUnidadePeso.Nenhum);
    setNaReceitaEstaUnidade(EUnidadeLiquido.Nenhum);
  }
  //#endregion

  //#region handles
  async function handleCalcular(): Promise<void> {
    const obj: IResultadoCalculadoLiquido = {
      naReceitaEstaUnidade: naReceitaEstaUnidade,
      naReceitaEsta: naReceitaEsta,
      paraCadaUnidade: paraCadaUnidade,
      paraCada: paraCada,
      vouFazerUnidade: vouFazerUnidade,
      vouFazer: vouFazer,
    };

    if (validarLiquidos(obj)) {
      const resultadoCalculado = calcularLiquidos(obj);
      const mensagemResultadoCalculado = definirMensagemLiquidos(resultadoCalculado, naReceitaEstaUnidade, naReceitaEstaUnidade);
      const objResultado: IResultadoCalculado = {
        tipo: ETipo.Liquido,
        // litros: converterLiquidoPara(resultadoCalculado, naReceitaEstaUnidade, EUnidadeLiquido.Litro),
        // mililitros: converterLiquidoPara(resultadoCalculado, naReceitaEstaUnidade, EUnidadeLiquido.Mililitro),
        naReceitaEsta: naReceitaEsta,
        naReceitaEstaUnidade: naReceitaEstaUnidade,
        paraCada: paraCada,
        paraCadaUnidade: paraCadaUnidade,
        vouFazer: vouFazer,
        vouFazerUnidade: vouFazerUnidade,
        resultado: mensagemResultadoCalculado,
      };

      const resultadosAnteriores = await retrieveData<Array<IResultadoCalculado>>('historico');

      storeData('historico', [...resultadosAnteriores, objResultado]);

      alert(mensagemResultadoCalculado);
      showToast(getFrase(ETipo.Liquido), toast);
    } else {
      alert('Faltou preencher algum campo, loira', 'Erro');
    }
  }
  //#endregion

  //#region functions
  const alert = (mensagem = '', title = 'Tu vai precisar de...') => Alert.alert(title, mensagem, [{ text: 'Ok' }]);
  //#endregion


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack
          flex={1}
        // justifyContent='center'
        >

          <VStack mb={5}>
            <VStack mx={12} my={6}>
              <Text fontSize='2xl' mb={3}>
                Na receita está...
              </Text>
              <VStack>
                <Input
                  placeholder='Insira a quantidade'
                  keyboardType='decimal-pad'
                  onChangeText={onChangeNaReceitaEsta}
                  value={naReceitaEsta === 0 ? '' : naReceitaEsta.toString()}
                  w='xs'
                  size='2xl'
                  mb={2}
                />

                <Select onValueChange={onChangeNaReceitaEstaUnidade} placeholder='Selecione' w='xs' size='2xl' selectedValue={naReceitaEstaUnidade.toString()}>
                  <Select.Item label='Litro' value={EUnidadeLiquido.Litro.toString()} />
                  <Select.Item label='Mililitro' value={EUnidadeLiquido.Mililitro.toString()} />
                </Select>

                <Text fontSize='2xl' my={6}>
                  Para cada...
                </Text>

                <Input
                  placeholder='Insira a quantidade'
                  keyboardType='decimal-pad'
                  onChangeText={onChangeParaCada}
                  value={paraCada === 0 ? '' : paraCada.toString()}
                  w='xs'
                  size='2xl'
                  mb={2}
                />

                <Select onValueChange={onChangeParaCadaUnidade} placeholder='Selecione' w='xs' size='2xl' selectedValue={paraCadaUnidade.toString()}>
                  <Select.Item label='Kilograma' value={EUnidadePeso.Kilograma.toString()} />
                  <Select.Item label='Grama' value={EUnidadePeso.Grama.toString()} />
                  <Select.Item label='Miligrama' value={EUnidadePeso.Miligrama.toString()} />
                </Select>

              </VStack>
              <VStack my={6}>
                <Text fontSize='2xl' my={3}>
                  E eu vou fazer...
                </Text>
                <Input
                  placeholder='Insira a quantidade'
                  keyboardType='decimal-pad'
                  onChangeText={onChangeVouFazer}
                  value={vouFazer === 0 ? '' : vouFazer.toString()}
                  w='xs'
                  size='2xl'
                  mb={2}
                />

                <Select onValueChange={onChangeVouFazerUnidade} placeholder='Selecione' w='xs' size='2xl' selectedValue={vouFazerUnidade.toString()}>
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
              mb={5}
              onPress={onPressCalcular}
            >
              <Text
                fontSize='2xl'
                color='white'
              >
                Calcula essa merda
              </Text>
            </Button>
            <Button
              w='xs'
              size='lg'
              onPress={onPressLimparCampos}
            >
              <Text
                fontSize='2xl'
                color='white'
              >
                Limpar
              </Text>
            </Button>
          </Center>
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}