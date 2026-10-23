/* BE.GALERIA (23/10/2026): o pouco de comportamento da pagina (vale para a home e para as cinco paginas dos espacos).
   1. a barra ganha fundo depois da abertura;
   2. o menu do celular abre e fecha;
   3. o item do menu acende conforme a secao visivel; 3b. o slide da abertura; 3c. o visualizador dos bastidores;
   3d. as trilhas horizontais das paginas dos espacos;
   4. os blocos entram em cena ao rolar. */
(function () {
  'use strict';
  var topo = document.getElementById('topo');
  var menu = document.getElementById('menu');
  var abrir = document.getElementById('menuAbrir');
  var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. barra com fundo fora da abertura */
  var pedido = false;
  function aoRolar() {
    if (pedido) return;
    pedido = true;
    window.requestAnimationFrame(function () {
      topo.classList.toggle('com-fundo', window.scrollY > 40);
      pedido = false;
    });
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* 2. menu do celular */
  function fecharMenu() {
    menu.classList.remove('aberto');
    topo.classList.remove('menu-aberto');
    abrir.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('travado');
  }
  abrir.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    topo.classList.toggle('menu-aberto', aberto);
    abrir.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    document.body.classList.toggle('travado', aberto);
  });
  menu.addEventListener('click', function (ev) { if (ev.target.tagName === 'A') fecharMenu(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fecharMenu(); });

  /* 3. item ativo */
  var itens = menu.querySelectorAll('a[href^="#"]');
  var alvos = [];
  Array.prototype.forEach.call(itens, function (a) {
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if (el) alvos.push({ a: a, el: el });
  });
  if ('IntersectionObserver' in window) {
    var guarda = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        alvos.forEach(function (x) { x.a.classList.toggle('ativo', x.el === e.target); });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    alvos.forEach(function (x) { if (x.el.offsetHeight > 0) guarda.observe(x.el); });
  }

  /* 3b. slide da abertura: troca sozinho a cada 6,5 s, para com o mouse em cima ou foco, e os tracinhos escolhem */
  var slides = document.querySelectorAll('.abertura .slide');
  var paginas = document.querySelectorAll('.abertura-paginas .pagina');
  var atualEl = document.getElementById('paginaAtual');
  var indice = 0, relogio = null, parado = false;
  function mostrarSlide(n) {
    indice = (n + slides.length) % slides.length;
    Array.prototype.forEach.call(slides, function (s, i) {
      var ativo = i === indice;
      s.classList.toggle('ativo', ativo);
      s.setAttribute('aria-hidden', ativo ? 'false' : 'true');
      Array.prototype.forEach.call(s.querySelectorAll('a'), function (a) { if (ativo) a.removeAttribute('tabindex'); else a.setAttribute('tabindex', '-1'); });
    });
    Array.prototype.forEach.call(paginas, function (b, i) { b.classList.toggle('cheia', i === indice); b.setAttribute('aria-selected', i === indice ? 'true' : 'false'); });
    if (atualEl) atualEl.textContent = String(indice + 1).padStart(2, '0');
  }
  function agendar() {
    window.clearInterval(relogio);
    if (calmo || slides.length < 2) return;
    relogio = window.setInterval(function () { if (!parado && !document.hidden) mostrarSlide(indice + 1); }, 6500);
  }
  if (slides.length > 1) {
    Array.prototype.forEach.call(paginas, function (b, i) { b.addEventListener('click', function () { mostrarSlide(i); agendar(); }); });
    var abertura = document.getElementById('inicio');
    abertura.addEventListener('mouseenter', function () { parado = true; });
    abertura.addEventListener('mouseleave', function () { parado = false; });
    abertura.addEventListener('focusin', function () { parado = true; });
    abertura.addEventListener('focusout', function () { parado = false; });
    // no celular, arrastar para o lado troca a foto
    var toqueX = null;
    abertura.addEventListener('touchstart', function (ev) { toqueX = ev.touches[0].clientX; }, { passive: true });
    abertura.addEventListener('touchend', function (ev) {
      if (toqueX === null) return;
      var dx = ev.changedTouches[0].clientX - toqueX; toqueX = null;
      if (Math.abs(dx) > 50) { mostrarSlide(indice + (dx < 0 ? 1 : -1)); agendar(); }
    }, { passive: true });
    mostrarSlide(0);
    agendar();
  }

  /* 3c. bastidores: clique na peca abre a foto grande; setas, teclado e clique fora fecham ou trocam */
  var visor = document.getElementById('visor');
  var pecas = Array.prototype.slice.call(document.querySelectorAll('#mosaico .peca'));
  var visorImagem = document.getElementById('visorImagem');
  var visorLegenda = document.getElementById('visorLegenda');
  var atualVisor = 0;
  function mostrarFoto(n) {
    if (!pecas.length) return;
    atualVisor = (n + pecas.length) % pecas.length;
    var img = pecas[atualVisor].querySelector('img');
    visorImagem.src = img.getAttribute('src');
    visorImagem.alt = img.alt;
    visorLegenda.textContent = String(atualVisor + 1).padStart(2, '0') + '  ' + (pecas[atualVisor].getAttribute('data-legenda') || '');
  }
  if (visor && pecas.length) {
    pecas.forEach(function (b, i) {
      b.addEventListener('click', function () {
        mostrarFoto(i);
        if (typeof visor.showModal === 'function') visor.showModal(); else visor.setAttribute('open', '');
        document.body.classList.add('travado');
      });
    });
    var fecharVisor = function () { if (visor.open) visor.close(); document.body.classList.remove('travado'); };
    document.getElementById('visorFechar').addEventListener('click', fecharVisor);
    document.getElementById('visorAnterior').addEventListener('click', function () { mostrarFoto(atualVisor - 1); });
    document.getElementById('visorProxima').addEventListener('click', function () { mostrarFoto(atualVisor + 1); });
    visor.addEventListener('click', function (ev) { if (ev.target === visor) fecharVisor(); });   // clique no fundo
    visor.addEventListener('close', function () { document.body.classList.remove('travado'); });
    document.addEventListener('keydown', function (ev) {
      if (!visor.open) return;
      if (ev.key === 'ArrowRight') mostrarFoto(atualVisor + 1);
      if (ev.key === 'ArrowLeft') mostrarFoto(atualVisor - 1);
    });
    var toqueVisorX = null;
    visor.addEventListener('touchstart', function (ev) { toqueVisorX = ev.touches[0].clientX; }, { passive: true });
    visor.addEventListener('touchend', function (ev) {
      if (toqueVisorX === null) return;
      var dx = ev.changedTouches[0].clientX - toqueVisorX; toqueVisorX = null;
      if (Math.abs(dx) > 50) mostrarFoto(atualVisor + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* 3d. trilhas horizontais das paginas dos espacos (momentos e, no celular, a colagem): barra de progresso e
     arrastar com o mouse (no toque a rolagem nativa ja resolve). Um clique depois de arrastar nao conta. */
  Array.prototype.forEach.call(document.querySelectorAll('.trilha, .colagem'), function (t) {
    var barra = t.parentElement.querySelector('.trilha-barra i');
    function medir() {
      var max = t.scrollWidth - t.clientWidth;
      if (!barra) return;
      var parte = max > 0 ? t.clientWidth / t.scrollWidth : 1;
      var pos = max > 0 ? t.scrollLeft / max : 0;
      barra.style.width = (parte * 100) + '%';
      barra.style.transform = 'translateX(' + (pos * (1 / parte - 1) * 100) + '%)';
    }
    t.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    medir();
    var x0 = null, s0 = 0, moveu = false;
    t.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType !== 'mouse' || t.scrollWidth <= t.clientWidth) return;
      x0 = ev.clientX; s0 = t.scrollLeft; moveu = false;
    });
    window.addEventListener('pointermove', function (ev) {
      if (x0 === null) return;
      var dx = ev.clientX - x0;
      if (!moveu && Math.abs(dx) > 5) { moveu = true; t.classList.add('arrastando'); }
      if (moveu) t.scrollLeft = s0 - dx;
    });
    window.addEventListener('pointerup', function () {
      if (x0 === null) return;
      x0 = null;
      window.setTimeout(function () { t.classList.remove('arrastando'); moveu = false; }, 50);
    });
    t.addEventListener('click', function (ev) { if (moveu) { ev.preventDefault(); ev.stopPropagation(); } }, true);
  });

  /* 4. entrada em cena */
  var blocos = document.querySelectorAll('.cabeca, .cartao, .sobre-texto, .sobre-foto, .peca, .experiencia-texto, .pilula, .manifesto-frase, .manifesto-colunas, .indice-lista li, .momento, .outros');
  Array.prototype.forEach.call(blocos, function (el, i) { el.classList.add('sobe'); el.style.transitionDelay = (i % 5) * 70 + 'ms'; });
  if (calmo || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(blocos, function (el) { el.classList.add('visivel'); });
  } else {
    var olho = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visivel');
        olho.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    Array.prototype.forEach.call(blocos, function (el) { olho.observe(el); });
  }
})();
