import { ETipo } from "../../enums/ETipo";

export function getFrase(tipo: ETipo): string {
  let index = Math.round(Math.random() * 10);

  if (tipo === ETipo.Liquido) {
    while (frasesLiquidos.length - 1< index) {
      index = Math.round(Math.random() * 10);
    }
    return frasesLiquidos[index];
  }

  if (tipo === ETipo.Solido) {
    while (frasesSolidos.length - 1 < index) {
      index = Math.round(Math.random() * 10);
    }
    return frasesSolidos[index];
  }

  return '';
}

const frasesSolidos: Array<string> = [
  'Minha ignorância é tamanha...',
  'Tenho mais de 35 anos e não sei fazer regra de três...',
  'Quantas gramas tem um kilo mesmo?',
  'Fuso horário é muito complicado...',
  '- Frederico, me responde urgente!\n- Alguém morreu?\n- Não, eu só não estudei matemática...'
];

const frasesLiquidos: Array<string> = [
  'Minha ignorância é tamanha...',
  'Tenho mais de 35 anos e não sei fazer regra de três...',
  'Se uma xícara tem 200ml, quantos ml tem uma xícara?',
  'Fuso horário é muito complicado...',
  '- Frederico, me responde urgente!\n- Alguém morreu?\n- Não, eu só não estudei matemática...'
];