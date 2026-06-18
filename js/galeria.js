// ========================
// SCROLL ANIMATIONS
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 100);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ========================
// NAVBAR
// ========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========================
// DADOS — GALERIA DE FOTOS
// ========================
const fotos = [
  { label: 'Culto de Domingo',       gradient: 'linear-gradient(135deg,#0B5CAC,#1D2023)' },
  { label: 'Louvor & Adoração',      gradient: 'linear-gradient(135deg,#FB62A2,#7f1d1d)' },
  { label: 'Encontro de Jovens',     gradient: 'linear-gradient(135deg,#7c3aed,#1D2023)' },
  { label: 'Ação Social',            gradient: 'linear-gradient(135deg,#065f46,#1D2023)' },
  { label: 'Batismo nas Águas',      gradient: 'linear-gradient(135deg,#1a1a2e,#0f3460)' },
  { label: 'Natal da Igreja',        gradient: 'linear-gradient(135deg,#b45309,#1D2023)' },
  { label: 'Semana de Oração',       gradient: 'linear-gradient(135deg,#0B5CAC,#065f46)' },
  { label: 'Culto de Casais',        gradient: 'linear-gradient(135deg,#FB62A2,#0B5CAC)' },
  { label: 'Escola Bíblica',         gradient: 'linear-gradient(135deg,#4183C5,#1D2023)' },
];

// ========================
// DADOS — EQUIPE DE LÍDERES
// ========================
const equipe = [
  { nome: 'Pastor Edgar',    cargo: 'Pastor Titular',           ministerio: 'Pastoral',          iniciais: 'PE', cor: '#0B5CAC' },
  { nome: 'Pastora Amanda',  cargo: 'Pastora Auxiliar',         ministerio: 'Pastoral',          iniciais: 'PA', cor: '#FB62A2' },
  { nome: 'A definir',       cargo: 'Líder de Louvor',          ministerio: 'Louvor & Adoração', iniciais: 'LL', cor: '#7c3aed' },
  { nome: 'A definir',       cargo: 'Líder dos Jovens',         ministerio: 'Jovens',            iniciais: 'LJ', cor: '#f59e0b' },
  { nome: 'A definir',       cargo: 'Líder Kids',               ministerio: 'Ministério Kids',   iniciais: 'LK', cor: '#10b981' },
  { nome: 'A definir',       cargo: 'Coord. de Casais',         ministerio: 'Casais',            iniciais: 'CC', cor: '#FB62A2' },
  { nome: 'A definir',       cargo: 'Coord. de Missões',        ministerio: 'Missões Mundiais',  iniciais: 'CM', cor: '#0B5CAC' },
  { nome: 'A definir',       cargo: 'Coord. de Ação Social',    ministerio: 'Ação Social',       iniciais: 'AS', cor: '#065f46' },
];

// ========================
// ÍCONE DE CÂMERA
// ========================
const cameraIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;

// ========================
// CLASSE CAROUSEL
// ========================
class Carousel {
  constructor({ trackEl, dotsEl, prevBtn, nextBtn, items, renderItem, visibleCount }) {
    this.track       = trackEl;
    this.dotsEl      = dotsEl;
    this.prevBtn     = prevBtn;
    this.nextBtn     = nextBtn;
    this.items       = items;
    this.renderItem  = renderItem;
    this.visible     = visibleCount;
    this.current     = 0;
    this.startX      = 0;
    this.isDragging  = false;

    this._buildItems();
    this._buildDots();
    this._bindArrows();
    this._bindSwipe();
    this._update();
  }

  _buildItems() {
    this.track.innerHTML = this.items.map((item, i) => this.renderItem(item, i)).join('');
    this.cards = Array.from(this.track.children);
  }

  _buildDots() {
    const pages = this._pageCount();
    this.dotsEl.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Página ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsEl.appendChild(dot);
    }
    this.dots = Array.from(this.dotsEl.children);
  }

  _pageCount() {
    return Math.max(1, this.items.length - this.visible + 1);
  }

  _update() {
    const cardWidth  = this.cards[0]?.offsetWidth || 0;
    const gap        = 20;
    const offset     = this.current * (cardWidth + gap);
    this.track.style.transform = `translateX(-${offset}px)`;

    const pages = this._pageCount();
    this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
    if (this.prevBtn) this.prevBtn.disabled = this.current === 0;
    if (this.nextBtn) this.nextBtn.disabled = this.current >= pages - 1;
  }

  goTo(idx) {
    const pages = this._pageCount();
    this.current = Math.max(0, Math.min(idx, pages - 1));
    this._update();
  }

  go(dir) { this.goTo(this.current + dir); }

  _bindArrows() {
    this.prevBtn?.addEventListener('click', () => this.go(-1));
    this.nextBtn?.addEventListener('click', () => this.go(1));
  }

  _bindSwipe() {
    const vp = this.track.parentElement;
    vp.addEventListener('touchstart', e => { this.startX = e.touches[0].clientX; }, { passive: true });
    vp.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this.startX;
      if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
}

// ========================
// VISIBLE COUNT POR BREAKPOINT
// ========================
function visibleFotos() {
  return window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : 3;
}

function visibleEquipe() {
  return window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
}

// ========================
// LIGHTBOX
// ========================
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let lbIndex     = 0;

function openLightbox(idx) {
  lbIndex = idx;
  renderLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const f = fotos[lbIndex];
  lbImg.innerHTML = `
    <div style="position:absolute;inset:0;background:${f.gradient};"></div>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.2);">${cameraIcon.replace('viewBox', 'width="72" height="72" viewBox')}</div>
  `;
  lbCaption.textContent = `${f.label} — ${lbIndex + 1} / ${fotos.length}`;
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + fotos.length) % fotos.length;
  renderLightbox();
});
document.getElementById('lbNext').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % fotos.length;
  renderLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + fotos.length) % fotos.length; renderLightbox(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % fotos.length; renderLightbox(); }
});

// ========================
// RENDER FOTO CARD
// ========================
function renderFotoCard(foto, idx) {
  return `
    <div class="foto-card" data-idx="${idx}" tabindex="0" role="button" aria-label="Abrir foto: ${foto.label}">
      <div class="foto-card__bg" style="background:${foto.gradient};"></div>
      <div class="foto-card__cam">${cameraIcon}</div>
      <div class="foto-card__overlay">
        <span class="foto-card__label">${foto.label}</span>
      </div>
    </div>
  `;
}

// ========================
// RENDER LIDER CARD
// ========================
function renderLiderCard(lider) {
  return `
    <div class="lider-card">
      <div class="lider-card__avatar" style="background:${lider.cor};">
        <span>${lider.iniciais}</span>
      </div>
      <span class="lider-card__ministerio">${lider.ministerio}</span>
      <p class="lider-card__nome">${lider.nome}</p>
      <p class="lider-card__cargo">${lider.cargo}</p>
    </div>
  `;
}

// ========================
// INICIALIZAR CARROSSEIS
// ========================
let galeriaCarousel, equipeCarousel;

function initCarousels() {
  galeriaCarousel = new Carousel({
    trackEl:      document.getElementById('galTrack'),
    dotsEl:       document.getElementById('galDots'),
    prevBtn:      document.getElementById('galPrev'),
    nextBtn:      document.getElementById('galNext'),
    items:        fotos,
    renderItem:   renderFotoCard,
    visibleCount: visibleFotos(),
  });

  equipeCarousel = new Carousel({
    trackEl:      document.getElementById('eqTrack'),
    dotsEl:       document.getElementById('eqDots'),
    prevBtn:      document.getElementById('eqPrev'),
    nextBtn:      document.getElementById('eqNext'),
    items:        equipe,
    renderItem:   renderLiderCard,
    visibleCount: visibleEquipe(),
  });

  // Bind lightbox on foto cards
  document.getElementById('galTrack').querySelectorAll('.foto-card').forEach(card => {
    const open = () => openLightbox(parseInt(card.dataset.idx));
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
}

// Rebuild carousels on resize to recalculate visible count
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initCarousels();
  }, 250);
});

initCarousels();
