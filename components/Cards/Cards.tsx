import { VStack } from "native-base";
import IResultadoCalculado from "../../interfaces/IResultadoCalculado";
import Card from '../Card/Card';

interface ICardsProps {
  resultados?: Array<IResultadoCalculado>
}

export default function Cards(props: ICardsProps) {
console.log((props))
  return (
    <VStack>
      {props.resultados?.map((item: IResultadoCalculado, index: number) => {
        return <Card key={index} resultado={item} />
      })}
    </VStack>
  );
}