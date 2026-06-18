// ========================
// NAVBAR
// ========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

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
// SCROLL ANIMATIONS
// ========================
const ANIM_SEL = '.fade-up, .fade-left, .fade-right, .zoom-in, .flip-in, .reveal';

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(ANIM_SEL).forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__link:not(.navbar__link--cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ========================
// SLIDER DE MINISTÉRIOS
// ========================
const ministerios = [
  {
    nome: 'Louvor e Adoração',
    tag: 'Ministério de Música',
    desc: 'Ministério de música e artes que conduz a congregação à presença de Deus através do louvor coletivo. Vocais, instrumentistas e técnicos de som e luz servem juntos a cada culto.',
    horario: 'Dom — após cada culto',
    lider: 'A definir',
    foto: 'assets/ministerio-louvor.jpg',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  },
  {
    nome: 'Kids',
    tag: 'Ministério Infantil',
    desc: 'Um ambiente seguro, colorido e divertido para que as crianças conheçam Jesus desde cedo. Ensinamentos bíblicos adaptados para cada faixa etária com dinâmicas, histórias e atividades.',
    horario: 'Dom — cultos da manhã',
    lider: 'A definir',
    foto: 'assets/ministerio-kids.jpg',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  },
  {
    nome: 'Jovens',
    tag: 'Ministério de Jovens',
    desc: 'Espaço para a juventude crescer na fé, construir amizades verdadeiras e servir ao Reino. Palavra relevante, louvor contemporâneo e uma comunidade que se importa com cada jovem.',
    horario: 'Sex — 19h30',
    lider: 'A definir',
    foto: 'assets/ministerio-jovens.jpg',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  },
  {
    nome: 'Casais',
    tag: 'Ministério de Família',
    desc: 'Fortalecendo famílias e relacionamentos à luz dos princípios bíblicos. Encontros mensais, aconselhamento pastoral e retiros especiais para casais em todas as fases do casamento.',
    horario: 'Qua — 19h30',
    foto: 'assets/ministerio-casais.jpg',
    fotoPos: 'center 25%',
    lider: 'A definir',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  },
  {
    nome: 'Servir',
    tag: 'Missões Mundiais',
    foto: 'assets/ministerio-servir.jpg',
    desc: 'Levando o evangelho além das fronteiras, apoiando missionários no Brasil e no mundo. Oramos, enviamos e sustentamos aqueles que partem para alcançar os povos não-alcançados.',
    horario: 'Seg — 19h',
    lider: 'A definir',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  },
  {
    nome: 'Ação Social',
    tag: 'Servindo a Comunidade',
    desc: 'Servindo à comunidade com amor prático: distribuição de alimentos, apoio emocional e projetos sociais. A fé sem obras é morta — e aqui a fé age com as mãos na massa.',
    horario: 'Sáb — 9h',
    lider: 'A definir',
    foto: 'assets/ministerio-acao-social.jpg',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
];

const minGradients = [
  'linear-gradient(135deg,#1a1a2e,#0f3460)',
  'linear-gradient(135deg,#f59e0b,#92400e)',
  'linear-gradient(135deg,#0B5CAC,#1D2023)',
  'linear-gradient(135deg,#FB62A2,#7f1d1d)',
  'linear-gradient(135deg,#065f46,#1D2023)',
  'linear-gradient(135deg,#7c3aed,#1D2023)',
];

const clockIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const userIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

// ---- Grid de cards ----
function renderMinGrid() {
  const grid = document.getElementById('minGrid');
  if (!grid) return;

  grid.innerHTML = ministerios.map((m, i) => `
    <div class="ministerios__card zoom-in${m.foto ? ' ministerios__card--foto' : ''}" style="--i:${i % 3}${m.foto ? `; --card-foto: url('../${m.foto}'); --card-foto-size: ${m.fotoZoom || 'cover'}; --card-foto-pos: ${m.fotoPos || 'center center'}` : ''}" data-idx="${i}" tabindex="0" role="button" aria-label="Abrir ${m.nome}">
      ${m.foto ? `<div class="ministerios__card-bg"></div>` : ''}
      <div class="ministerios__icon">${m.icon}</div>
      <h3>${m.nome}</h3>
      <p>${m.desc.substring(0, 90)}…</p>
    </div>
  `).join('');

  grid.querySelectorAll('.ministerios__card').forEach(card => {
    card.addEventListener('click', () => openMinModal(parseInt(card.dataset.idx)));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openMinModal(parseInt(card.dataset.idx)); });
    observer.observe(card);
  });
}

// ---- Modal ----
function openMinModal(idx) {
  const m       = ministerios[idx];
  const modal   = document.getElementById('minModal');
  const content = document.getElementById('minModalContent');

  content.innerHTML = `
    <div class="min-modal__header">
      <div class="min-modal__header-bg" style="background:${minGradients[idx]}"></div>
      <div class="min-modal__icon">${m.icon}</div>
      <div class="min-modal__titles">
        <span class="min-modal__tag">${m.tag}</span>
        <h3 class="min-modal__title">${m.nome}</h3>
      </div>
    </div>
    <div class="min-modal__body">
      <p class="min-modal__desc">${m.desc}</p>
      <div class="min-modal__meta">
        <span class="min-modal__meta-item">${clockIcon} ${m.horario}</span>
        <span class="min-modal__meta-item">${userIcon} Líder: ${m.lider}</span>
      </div>
      <a href="#contato" class="btn btn--primary" onclick="closeMinModal()">Quero participar</a>
    </div>
  `;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMinModal() {
  const modal = document.getElementById('minModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('minClose')?.addEventListener('click', closeMinModal);
document.getElementById('minBackdrop')?.addEventListener('click', closeMinModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMinModal(); });

renderMinGrid();


// ========================
// CONTADOR ANIMADO
// ========================
function animateCounter(el, target, duration = 1800) {
  const prefix = el.dataset.prefix || '';
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target.toLocaleString('pt-BR');
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stats__number').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target, 10));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ========================
// COUNTDOWN PRÓXIMO CULTO
// ========================
function nextService() {
  // Horários dos cultos: [diaDaSemana (0=Dom), hora, min]
  const services = [
    [0, 9, 0],   // Domingo 09:00
    [3, 19, 30], // Quarta 19:30
    [5, 19, 30], // Sexta 19:30
  ];

  const now = new Date();
  // Ajuste para horário de Brasília (UTC-3)
  const brasiliaOffset = -3 * 60;
  const localOffset = now.getTimezoneOffset();
  const diff = brasiliaOffset - (-localOffset);
  const brt = new Date(now.getTime() + diff * 60 * 1000);

  let nearest = null;

  for (const [day, h, m] of services) {
    const candidate = new Date(brt);
    const currentDay = brt.getDay();
    let daysAhead = (day - currentDay + 7) % 7;
    // Se for hoje mas já passou, pula para semana que vem
    if (daysAhead === 0) {
      const serviceMinutes = h * 60 + m;
      const nowMinutes = brt.getHours() * 60 + brt.getMinutes();
      if (nowMinutes >= serviceMinutes) daysAhead = 7;
    }
    candidate.setDate(brt.getDate() + daysAhead);
    candidate.setHours(h, m, 0, 0);
    if (!nearest || candidate < nearest) nearest = candidate;
  }

  return nearest;
}

function updateCountdown() {
  const target = nextService();
  if (!target) return;

  const now = new Date();
  const brasiliaOffset = -3 * 60;
  const localOffset = now.getTimezoneOffset();
  const diff = brasiliaOffset - (-localOffset);
  const brt = new Date(now.getTime() + diff * 60 * 1000);

  const remaining = target - brt;

  if (remaining <= 0) {
    updateCountdown(); // recalcula
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((remaining % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent = pad(mins);
  document.getElementById('cd-secs').textContent = pad(secs);
}

if (document.getElementById('cd-secs')) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ========================
// COPIAR CHAVE PIX
// ========================
function copyPix() {
  const key = document.getElementById('pix-key').textContent.trim();
  const btn = document.querySelector('.doacoes__copy-btn');
  const label = document.getElementById('copy-label');

  navigator.clipboard.writeText(key).then(() => {
    btn.classList.add('copied');
    label.textContent = 'Copiado!';
    setTimeout(() => {
      btn.classList.remove('copied');
      label.textContent = 'Copiar chave';
    }, 2000);
  }).catch(() => {
    // Fallback para browsers sem clipboard API
    const el = document.createElement('textarea');
    el.value = key;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    btn.classList.add('copied');
    label.textContent = 'Copiado!';
    setTimeout(() => {
      btn.classList.remove('copied');
      label.textContent = 'Copiar chave';
    }, 2000);
  });
}
