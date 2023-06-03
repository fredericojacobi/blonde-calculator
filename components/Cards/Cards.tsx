import { Center, Text, VStack } from "native-base";
import Card from '../Card/Card';
import { IResultadoCalculado } from "../../interfaces/IResultadoCalculado";

interface ICardsProps {
  resultados: Array<IResultadoCalculado>
}
export default function Cards(props: ICardsProps) {
  return (
    <VStack my={5}>
      {props.resultados.length > 0 ?
        props.resultados?.map((item: IResultadoCalculado, index: number) => {
          return <Card key={index} resultado={item} />
        }) :
        <Center>
          <Text
            fontSize={20}
            fontFamily='mono'
          >
            Nenhum resultado salvo
          </Text>
        </Center>
      }
    </VStack>
  );
}