import { Box, VStack, Divider, Text } from "native-base";
import IResultadoCalculado from "../../interfaces/IResultadoCalculado";
import { EUnidadeLiquido } from "../../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../../enums/EUnidadePeso";

interface ICardProps {
  resultado: IResultadoCalculado
}

export default function Card(props: ICardProps) {
  const naReceitaEstaValorMontado = `${props.resultado.naReceitaEsta} ${EUnidadeLiquido[props.resultado.naReceitaEstaUnidade ?? 0]}`;
  const paraCadaValorMontado = `${props.resultado.paraCada} ${EUnidadePeso[props.resultado.paraCadaUnidade ?? 0]}`;
  const vouFazerValorMontado = `${props.resultado.vouFazer} ${EUnidadePeso[props.resultado.vouFazerUnidade ?? 0]}`;
  const horarioMontado = props.resultado.horario ? `Calculado às ${props.resultado.horario.toString()}` : null;
  
  return (
    <Box m={5} p={5} borderWidth={1} borderStyle='solid' borderRadius='md' borderColor='red.600'>
      <VStack space="4">
        <Box>
          <Text>Conversão de {props.resultado.tipo === 'liquido' ? 'Líquido' : 'Sólido'}</Text>
        </Box>
        <Box>
          <Text>Na receita está {naReceitaEstaValorMontado} para cada {paraCadaValorMontado}.</Text>
          <Text>Eu vou fazer {vouFazerValorMontado}</Text>
          <Text>Portanto, precisarei de {props.resultado.litros} Litro(s) ou {props.resultado.mililitros} Mililitros</Text>
        </Box>
        <Box>
          <Text>{horarioMontado}</Text>
        </Box>
      </VStack>
    </Box>
  );
}