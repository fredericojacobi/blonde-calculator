import { EUnidadeLiquido } from "../../enums/EUnidadeLiquido";
import { EUnidadePeso } from "../../enums/EUnidadePeso";

//#region números
export function formatarNumero(value: string) {
  return value.replace(',', '.');
}
//#endregion

//#region líquidos
export function converterLiquidoPara(valor = 0, formatoOrigem = EUnidadeLiquido.Nenhum, formatoDestino = EUnidadeLiquido.Nenhum): number {
  let resultado: number;

  if(valor === 0 || formatoOrigem === EUnidadeLiquido.Nenhum || formatoDestino === EUnidadeLiquido.Nenhum)
    return 0;


  if (formatoOrigem === EUnidadeLiquido.Litro) {
    if (formatoDestino === EUnidadeLiquido.Mililitro)
      resultado = litroParaMililitro(valor);
    else
      resultado = valor;
  } else {
    if (formatoDestino === EUnidadeLiquido.Litro)
      resultado = mililitroParaLitro(valor);
    else
      resultado = valor;
  }

  return resultado;
}

function litroParaMililitro(litro: number): number {
  return litro * 1000;
}

function mililitroParaLitro(mililitro: number): number {
  return mililitro / 1000;
}

//#endregion

//#region sólidos
export function converterPesoPara(valor = 0, formatoOrigem = EUnidadePeso.Nenhum, formatoDestino = EUnidadePeso.Nenhum): number {
  let resultado: number;

  if(valor === 0 || formatoOrigem === EUnidadePeso.Nenhum || formatoDestino === EUnidadePeso.Nenhum)
    return 0;

  if (formatoOrigem === EUnidadePeso.Kilograma)
    if (formatoDestino === EUnidadePeso.Miligrama)
      resultado = kiloParaMiligrama(valor);
    else if (formatoDestino === EUnidadePeso.Grama)
      resultado = kiloParaGrama(valor);
    else
      resultado = valor;
  else if (formatoOrigem === EUnidadePeso.Grama)
    if (formatoDestino === EUnidadePeso.Kilograma)
      resultado = gramaParaKilo(valor);
    else if (formatoDestino === EUnidadePeso.Miligrama)
      resultado = gramaParaMiligrama(valor);
    else
      resultado = valor;
  else
    if (formatoDestino === EUnidadePeso.Kilograma)
      resultado = miligramaParaKilo(valor);
    else if (formatoDestino === EUnidadePeso.Grama)
      resultado = miligramaParaGrama(valor);
    else
      resultado = valor;

  return resultado;
}

function kiloParaGrama(kilo: number): number {
  return kilo * 1000;
}

function gramaParaMiligrama(grama: number): number {
  return grama * 1000;
}

function miligramaParaGrama(miligrama: number): number {
  return miligrama / 1000;
}

function gramaParaKilo(grama: number): number {
  return grama / 1000;
}

function kiloParaMiligrama(kilo: number): number {
  let valor: number;

  valor = kiloParaGrama(kilo);
  valor = gramaParaMiligrama(valor);

  return valor;
}

function miligramaParaKilo(miligrama: number): number {
  let valor: number;

  valor = miligramaParaGrama(miligrama);
  valor = gramaParaKilo(valor);

  return valor;
}

//#endregion