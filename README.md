# BE.GALERIA

Site de uma pagina da BE.GALERIA, em Sao Paulo: "mais do que uma galeria, um estilo de vida". HTML, CSS e JavaScript
puros, sem build. Feito a partir do mockup aprovado em 23/10/2026.

## Arquivos

- `index.html`: a pagina (abertura, Nossos espacos, Sobre, Viva essa experiencia, rodape).
- `estilo.css`: o visual. Fundo onix, Outfit em caixa alta leve nos titulos, Inter nos textos, La Belle Aurore no
  manuscrito do bloco Sobre e um unico acento: o degrade magenta > laranja (anel do selo, tracinhos, linha do rodape).
- `script.js`: barra com fundo ao rolar, menu do celular, item ativo do menu e entrada em cena dos blocos.
- `img/heroi.webp` e `img/heroi-cel.webp`: a foto da abertura (a que ela subiu no repositorio), em webp para PC e celular.
- `img/espaco-*.jpg`, `img/sobre.jpg`, `img/folhas.jpg`: **provisorias**, recortadas do proprio mockup e por isso
  borradas. Trocar pelas fotos reais mantendo os mesmos nomes (cartoes em 4:3 ou proximo; `sobre.jpg` na horizontal;
  `folhas.jpg` bem larga e baixa).

## O que falta ela passar

- Fotos reais dos cinco espacos, do bloco Sobre e da faixa de folhas (ver acima).
- Links do Instagram, LinkedIn e YouTube (hoje os icones do rodape nao levam a lugar nenhum) e o WhatsApp ou e-mail
  de contato (hoje "Entre em contato" leva ao rodape).
- Se "Galeria" e "Servicos" do menu forem virar paginas proprias, os textos de cada uma.

## Publicar

Repositorio estatico: na Vercel, Add New > Project, importar `Luanaereio/be.galeria`, sem build e sem variavel, com
a branch de producao apontada para a branch que estiver no ar.
