export function getFrase(): string {
  let index = Math.round(Math.random() * 10);
  
  while (frases.length < index) {
    index = Math.round(Math.random() * 10);
  }

  return frases[index];
}

const frases: Array<string> = [
  'Minha ignorância é tamanha...',
  'Tenho mais de 35 anos e não sei fazer regra de três...',
  'Quantas gramas tem um kilo mesmo?',
  'Se uma xícara tem 200ml, quantos ml tem uma xícara?',
  'Fuso horário é muito complicado...',
]