import { EUnidadeLiquido } from "../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../enums/EUnidadePeso";

export default interface IResultadoCalculado {
  tipo?: string,
  litros?: number,
  mililitros?: number,
  naReceitaEstaUnidade?: EUnidadeLiquido,
  naReceitaEsta?: number,
  paraCadaUnidade?: EUnidadePeso,
  paraCada?: number,
  vouFazerUnidade?: EUnidadePeso,
  vouFazer?: number,
  horario?: Date
}