import { ETipo } from "../enums/ETipo";
import { EUnidadeLiquido } from "../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../enums/EUnidadePeso";

export interface IResultadoCalculadoLiquido {
  tipo?: ETipo,
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

export interface IResultadoCalculadoSolido {
  tipo?: ETipo,
  kilo?: number,
  miligrama?: number,
  naReceitaEstaUnidade?: EUnidadePeso,
  naReceitaEsta?: number,
  paraCadaUnidade?: EUnidadeLiquido,
  paraCada?: number,
  vouFazerUnidade?: EUnidadeLiquido,
  vouFazer?: number,
  horario?: Date
}

export interface IResultadoCalculado {
  tipo: ETipo
  naReceitaEsta: number
  paraCada: number
  vouFazer: number
  naReceitaEstaUnidade: number
  paraCadaUnidade: number
  vouFazerUnidade: number
  resultado: string
  horario?: string
}