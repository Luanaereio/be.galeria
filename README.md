# BE.GALERIA

Site de uma pagina da BE.GALERIA, em Sao Paulo: "mais do que uma galeria, um estilo de vida". HTML, CSS e JavaScript
puros, sem build. Feito a partir do mockup aprovado em 23/10/2026.

## Arquivos

- `index.html`: a pagina (abertura, Nossos espacos, Sobre, Viva essa experiencia, rodape).
- `estilo.css`: o visual. Fundo onix, Montserrat em tudo (caixa alta leve nos titulos), Allison no manuscrito do
  bloco Sobre e um unico acento: o degrade magenta > laranja (anel do selo, tracinhos, linha do rodape).
- `script.js`: barra com fundo ao rolar, menu do celular, item ativo do menu e entrada em cena dos blocos.
- `img/heroi.webp` e `img/heroi-cel.webp`: a foto da abertura (a que ela subiu no repositorio), em webp para PC e celular.
- Cartoes de "Nossos espacos" (23/10): Projetos de arquitetura (`img/arquitetura.jpg`), Design de interiores
  (`img/interiores.jpg`), Casa BE Galeria (`img/casa.jpg`), Habitar Sentidos (`img/habitar-sentidos.jpg`) e Eventos &
  experiencias (`img/eventos.jpg`). As fotos sao as reais, mandadas por ela em 23/10 (JPEG no tamanho original,
  qualidade 0,92; o cartao recorta ao centro). Os links levam ao contato ate ela mandar o endereco de cada item.
- `img/sobre.jpg`: provisoria, recortada do mockup; trocar pela foto real na horizontal.
- `img/folhas.jpg`: fundo da faixa "Viva essa experiencia", recortado das palmeiras da foto do header (o recorte do
  mockup trazia o texto desenhado dentro da imagem). Pode ser trocado por uma foto de folhas bem larga e baixa.

## O que falta ela passar

- Foto real do bloco Sobre e o endereco (link) de cada cartao: projetos no site oficial, projeto de mobiliario,
  Casa BE Galeria, evento Habitar Sentidos e o evento realizado.
- Links do Instagram, LinkedIn e YouTube (hoje os icones do rodape nao levam a lugar nenhum) e o WhatsApp ou e-mail
  de contato (hoje "Entre em contato" leva ao rodape).
- Se "Galeria" e "Servicos" do menu forem virar paginas proprias, os textos de cada uma.

## Publicar

Repositorio estatico: na Vercel, Add New > Project, importar `Luanaereio/be.galeria`, sem build e sem variavel, com
a branch de producao apontada para a branch que estiver no ar.
