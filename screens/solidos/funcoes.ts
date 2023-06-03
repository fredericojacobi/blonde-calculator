import { EUnidadeLiquido } from "../../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../../enums/EUnidadePeso";
import { IResultadoCalculadoSolido } from "../../interfaces/IResultadoCalculado";
import { converterLiquidoPara, converterPesoPara } from "../../utils/funcoes/conversoes";
import { regraDeTres } from "../../utils/funcoes/regraDeTres";

export function calcularSolidos(obj: IResultadoCalculadoSolido): number {
  const { naReceitaEsta, naReceitaEstaUnidade, paraCada, paraCadaUnidade, vouFazer, vouFazerUnidade } = obj;

  let valorReceitaMiligrama: number;
  let quantidadeReceitaMililitro: number;
  let quantidadePrecisoMililitro: number;

  valorReceitaMiligrama = converterPesoPara(naReceitaEsta, naReceitaEstaUnidade, EUnidadePeso.Miligrama);

  quantidadeReceitaMililitro = converterLiquidoPara(paraCada, paraCadaUnidade, EUnidadeLiquido.Mililitro);

  quantidadePrecisoMililitro = converterLiquidoPara(vouFazer, vouFazerUnidade, EUnidadeLiquido.Mililitro);

  let resultado: number = regraDeTres(valorReceitaMiligrama, quantidadeReceitaMililitro, quantidadePrecisoMililitro);

  resultado = converterPesoPara(resultado, EUnidadePeso.Miligrama, naReceitaEstaUnidade);
  
  return resultado;
}

export function definirMensagemSolidos(resultado: number, formatoOrigem: EUnidadePeso, formatoDesejado: EUnidadePeso): string {
  if (formatoOrigem === formatoDesejado) {
    return (
      `${resultado} ${EUnidadePeso[formatoDesejado]}(s)\nou\n${converterPesoPara(resultado, formatoOrigem, EUnidadePeso.Grama)} ${EUnidadePeso[EUnidadePeso.Grama]}(s)\nou\n${converterPesoPara(resultado, formatoOrigem, EUnidadePeso.Miligrama)} ${EUnidadePeso[EUnidadePeso.Miligrama]}(s)`
    );
  }

  return '';
}

export function validarSolidos(obj: IResultadoCalculadoSolido): boolean {
  const { naReceitaEsta, naReceitaEstaUnidade, paraCada, paraCadaUnidade, vouFazer, vouFazerUnidade } = obj;

  return Boolean(naReceitaEsta && paraCada && vouFazer && naReceitaEstaUnidade && vouFazerUnidade && paraCadaUnidade);
}