import { EUnidadeLiquido } from "../../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../../enums/EUnidadePeso";
import { IResultadoCalculadoLiquido } from "../../interfaces/IResultadoCalculado";
import { converterLiquidoPara, converterPesoPara } from "../../utils/funcoes/conversoes";
import { regraDeTres } from "../../utils/funcoes/regraDeTres";

export function calcularLiquidos(obj: IResultadoCalculadoLiquido): number {
  const { naReceitaEsta, naReceitaEstaUnidade, paraCada, paraCadaUnidade, vouFazer, vouFazerUnidade } = obj;

  let valorReceitaMililitro: number;
  let pesoReceitaMiligrama: number;
  let pesoPrecisoMiligrama: number;

  valorReceitaMililitro = converterLiquidoPara(naReceitaEsta, naReceitaEstaUnidade, EUnidadeLiquido.Mililitro);

  pesoReceitaMiligrama = converterPesoPara(paraCada, paraCadaUnidade, EUnidadePeso.Miligrama);

  pesoPrecisoMiligrama = converterPesoPara(vouFazer, vouFazerUnidade, EUnidadePeso.Miligrama);

  let resultado: number = regraDeTres(valorReceitaMililitro, pesoReceitaMiligrama, pesoPrecisoMiligrama);

  resultado = converterLiquidoPara(resultado, EUnidadeLiquido.Mililitro, naReceitaEstaUnidade);

  return resultado;
}

export function definirMensagemLiquidos(resultado: number, formatoOrigem: EUnidadeLiquido, formatoDesejado: EUnidadeLiquido): string {
  if (formatoOrigem === formatoDesejado) {
    return (
      `${resultado} ${EUnidadeLiquido[formatoDesejado]}(s)\nou\n${converterLiquidoPara(resultado, formatoOrigem, EUnidadeLiquido.Mililitro)} ${EUnidadeLiquido[EUnidadeLiquido.Mililitro]}(s)`
    );
  }

  return '';
}

export function validarLiquidos(obj: IResultadoCalculadoLiquido): boolean {
  const { naReceitaEsta, naReceitaEstaUnidade, paraCada, paraCadaUnidade, vouFazer, vouFazerUnidade } = obj;

  return Boolean(naReceitaEsta && paraCada && vouFazer && naReceitaEstaUnidade && vouFazerUnidade && paraCadaUnidade);
}