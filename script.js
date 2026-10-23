/* BE.GALERIA (23/10/2026): o pouco de comportamento da pagina.
   1. a barra ganha fundo depois da abertura;
   2. o menu do celular abre e fecha;
   3. o item do menu acende conforme a secao visivel; 3b. o slide da abertura;
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

  /* 4. entrada em cena */
  var blocos = document.querySelectorAll('.cabeca, .cartao, .sobre-texto, .sobre-foto, .experiencia-texto, .pilula');
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
