# BE.GALERIA

Site de uma pagina da BE.GALERIA, em Sao Paulo: "mais do que uma galeria, um estilo de vida". HTML, CSS e JavaScript
puros, sem build. Feito a partir do mockup aprovado em 23/10/2026.

## Arquivos

- `index.html`: a pagina (abertura em slide, Nossos espacos, Sobre, Bastidores, Viva essa experiencia, rodape).
- Bastidores: mosaico editorial com as sete fotos dela (`img/bastidores-1.jpg` a `-7.jpg`, ate 1600 px), legenda
  numerada ao passar o mouse (sempre visivel no toque) e visualizador em tamanho grande (`<dialog>`, setas, teclado e
  arrastar). As legendas estao no `data-legenda` de cada peca.
- `arquitetura.html`, `interiores.html`, `casa.html`, `habitar-sentidos.html`, `eventos.html` (23/10): a pagina de
  cada cartao de "Nossos espacos", em formato de editorial. As cinco tem a MESMA estrutura (ao mudar uma, mudar as
  outras quatro): capa com a foto do cartao sangrando ate a borda direita e o numero gigante vazado atras do titulo,
  que entra palavra por palavra, mais um trilho vertical com os cinco espacos; letreiro que corre com os temas;
  manifesto com uma foto presa ao fundo (sticky) enquanto a frase (destaque em degrade) e o texto passam por cima;
  indice em linhas finas (4 itens); momentos numa trilha horizontal que arrasta com o mouse e rola com o dedo (3 com
  foto + um convite para conversar), com barra de progresso; colagem de 3 fotos sobrepostas com legenda vertical,
  que no celular vira um lookbook deslizante, abrindo no mesmo visualizador dos bastidores; proximo espaco em tela
  cheia (em circulo: a 5a volta para a 1a); linha com os cinco espacos; faixa de contato e rodape. No celular a
  capa e a foto em tela cheia com o texto embaixo e o numero cortado no canto direito. O menu aponta para
  `index.html#...` com "Galeria" aceso. A classe do `body` e `interna` (nao pode ser `pagina`, que e a dos tracinhos
  do slide). Os textos sao os primeiros, escritos a partir do que o site ja dizia: confirmar com a cliente (em
  especial nomes de projetos, formatos de evento e a frase "ja recebeu lancamentos").
- `estilo.css`: o visual. Fundo onix, Montserrat em tudo (caixa alta leve nos titulos) e um unico acento: o degrade
  magenta > laranja (tracinhos, numeros das legendas, linha do rodape). O manuscrito do bloco Sobre esta gravado na
  foto. O selo redondo da abertura saiu em 23/10 a pedido dela.
- `script.js`: barra com fundo ao rolar, menu do celular, item ativo do menu e entrada em cena dos blocos.
- `img/heroi.webp`, `img/heroi-2.webp`, `img/heroi-3.webp` (e as `-cel.webp` para celular): as tres fotos da abertura,
  que e um slide (troca a cada 6,5 s, para com o mouse em cima, tracinhos clicaveis, arrastar no celular). Cada foto
  tem o proprio texto no `index.html`.
- Cartoes de "Nossos espacos" (23/10): Projetos de arquitetura (`img/arquitetura.jpg`), Design de interiores
  (`img/interiores.jpg`), Casa BE Galeria (`img/casa.jpg`), Habitar Sentidos (`img/habitar-sentidos.jpg`) e Eventos &
  experiencias (`img/eventos.jpg`). As fotos sao as reais, mandadas por ela em 23/10 (JPEG no tamanho original,
  qualidade 0,92; o cartao recorta ao centro). Cada cartao abre a propria pagina (ver acima).
- `img/sobre.jpg` e `img/sobre-cel.jpg`: a foto real do bloco Sobre, mandada por ela em 23/10, com a frase
  "Arte, conexoes, experiencias reais." ja gravada na imagem (por isso nao ha texto em HTML por cima).
- `img/folhas.jpg`: fundo da faixa "Viva essa experiencia", recortado das palmeiras da foto do header (o recorte do
  mockup trazia o texto desenhado dentro da imagem). Pode ser trocado por uma foto de folhas bem larga e baixa.

## O que falta ela passar

- Os textos definitivos das cinco paginas dos espacos e, se houver, o endereco do site oficial com os projetos
  (Milena Beauty, Chele Andino) para linkar na pagina de arquitetura.
- Links do Instagram, LinkedIn e YouTube (hoje os icones do rodape nao levam a lugar nenhum) e o WhatsApp ou e-mail
  de contato (hoje "Entre em contato" leva ao rodape).
- Se "Galeria" e "Servicos" do menu forem virar paginas proprias, os textos de cada uma.

## Publicar

Repositorio estatico: na Vercel, Add New > Project, importar `Luanaereio/be.galeria`, sem build e sem variavel, com
a branch de producao apontada para a branch que estiver no ar.
