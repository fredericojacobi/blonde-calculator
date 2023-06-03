import { Box, VStack, Text, Center } from "native-base";
import { EUnidadeLiquido } from "../../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../../enums/EUnidadePeso";
import { ETipo } from "../../enums/ETipo";
import { IResultadoCalculado } from "../../interfaces/IResultadoCalculado";

interface ICardProps {
  resultado: IResultadoCalculado
}

export default function Card(props: ICardProps) {
  const naReceitaEstaValorMontado = props.resultado.tipo === ETipo.Liquido
    ? `${props.resultado.naReceitaEsta} ${EUnidadeLiquido[props.resultado.naReceitaEstaUnidade ?? 0]}`
    : `${props.resultado.naReceitaEsta} ${EUnidadePeso[props.resultado.naReceitaEstaUnidade ?? 0]}`;

  const paraCadaValorMontado = props.resultado.tipo === ETipo.Liquido
    ? `${props.resultado.paraCada} ${EUnidadePeso[props.resultado.paraCadaUnidade ?? 0]}`
    : `${props.resultado.paraCada} ${EUnidadeLiquido[props.resultado.paraCadaUnidade ?? 0]}`;

  const vouFazerValorMontado = props.resultado.tipo === ETipo.Liquido
    ? `${props.resultado.vouFazer} ${EUnidadePeso[props.resultado.vouFazerUnidade ?? 0]}`
    : `${props.resultado.vouFazer} ${EUnidadeLiquido[props.resultado.vouFazerUnidade ?? 0]}`;

  return (
    <Box
      m={5}
      p={5}
      borderWidth={1}
      borderStyle='solid'
      borderRadius='md'
      borderColor='primary.500'
      bgColor='white'
      shadow='5'
    >
      <VStack space="4">
        <Box>
          <Center>
            <Text>Conversão de {props.resultado.tipo === ETipo.Liquido ? 'Líquido' : 'Sólido'}</Text>
          </Center>
        </Box>
        <Box>
          <Text>Na receita está {naReceitaEstaValorMontado} para cada {paraCadaValorMontado}.</Text>
          <Text>Eu vou fazer {vouFazerValorMontado}</Text>
          <Text>Portanto, precisarei de {props.resultado.resultado}</Text>
        </Box>
      </VStack>
    </Box>
  );
}