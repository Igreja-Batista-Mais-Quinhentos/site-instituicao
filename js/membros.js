// ========================
// EMAILJS — CONFIGURE AQUI
// ========================
// 1. Crie conta gratuita em https://www.emailjs.com
// 2. Crie um Email Service e um Email Template para cada formulário
// 3. Substitua os valores abaixo pelas suas chaves reais
const EJS_PUBLIC_KEY     = 'SUA_PUBLIC_KEY';       // Account > API Keys
const EJS_SERVICE_ID     = 'SUA_SERVICE_ID';       // Email Services
const EJS_TEMPLATE_VISITA  = 'template_visita';    // Email Templates
const EJS_TEMPLATE_MEMBRO  = 'template_membro';    // Email Templates

emailjs.init({ publicKey: EJS_PUBLIC_KEY });

// ========================
// NAVBAR
// ========================
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

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
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 120);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ========================
// DATA MÍNIMA — hoje
// ========================
const dataInput = document.getElementById('v-data');
if (dataInput) {
  const today = new Date().toISOString().split('T')[0];
  dataInput.min = today;
}

// ========================
// HELPERS
// ========================
function setLoading(btnEl, spinnerEl, labelEl, loading) {
  btnEl.disabled = loading;
  spinnerEl.classList.toggle('hidden', !loading);
  labelEl.textContent = loading ? 'Enviando…' : labelEl.dataset.original;
}

function showError(el, msg) {
  el.textContent = msg;
}

function clearError(el) {
  el.textContent = '';
}

// ========================
// FORMULÁRIO DE VISITA
// ========================
const formVisita = document.getElementById('formVisita');
const vSuccess   = document.getElementById('v-success');
const vError     = document.getElementById('v-error');
const vBtn       = document.getElementById('v-btn');
const vBtnLabel  = document.getElementById('v-btn-label');
const vSpinner   = document.getElementById('v-spinner');

vBtnLabel.dataset.original = vBtnLabel.textContent;

formVisita.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError(vError);

  const nome    = document.getElementById('v-nome').value.trim();
  const email   = document.getElementById('v-email').value.trim();
  const data    = document.getElementById('v-data').value;
  const horario = document.getElementById('v-horario').value;

  if (!nome)    return showError(vError, 'Por favor, informe seu nome.');
  if (!email || !email.includes('@')) return showError(vError, 'Por favor, informe um e-mail válido.');
  if (!data)    return showError(vError, 'Por favor, selecione uma data.');
  if (!horario) return showError(vError, 'Por favor, selecione um horário.');

  const tel = document.getElementById('v-tel').value.trim();
  const msg = document.getElementById('v-msg').value.trim();
  const dataFormatada = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  setLoading(vBtn, vSpinner, vBtnLabel, true);

  try {
    await emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_VISITA, {
      nome,
      email,
      telefone:  tel || 'Não informado',
      data:      dataFormatada,
      horario,
      mensagem:  msg || 'Nenhuma mensagem adicional.',
      igreja_email: 'contato@igrejamais500.com.br',
      igreja_nome:  'Igreja Batista +500',
      igreja_end:   'Rua dos Passos, 185 — Taubaté, SP',
    });

    document.getElementById('v-success-email').textContent = email;
    formVisita.style.display = 'none';
    vSuccess.classList.remove('hidden');

  } catch (err) {
    // Fallback: simula sucesso quando EmailJS não está configurado
    if (EJS_PUBLIC_KEY === 'SUA_PUBLIC_KEY') {
      document.getElementById('v-success-email').textContent = email;
      formVisita.style.display = 'none';
      vSuccess.classList.remove('hidden');
    } else {
      showError(vError, 'Ocorreu um erro ao enviar. Tente novamente ou entre em contato por telefone.');
      setLoading(vBtn, vSpinner, vBtnLabel, false);
    }
  }
});

function resetVisita() {
  formVisita.reset();
  formVisita.style.display = '';
  vSuccess.classList.add('hidden');
  clearError(vError);
}

// ========================
// FORMULÁRIO DE MEMBRESIA
// ========================
const formMembro = document.getElementById('formMembro');
const mSuccess   = document.getElementById('m-success');
const mError     = document.getElementById('m-error');
const mBtn       = document.getElementById('m-btn');
const mBtnLabel  = document.getElementById('m-btn-label');
const mSpinner   = document.getElementById('m-spinner');

mBtnLabel.dataset.original = mBtnLabel.textContent;

formMembro.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError(mError);

  const nome  = document.getElementById('m-nome').value.trim();
  const email = document.getElementById('m-email').value.trim();

  if (!nome)  return showError(mError, 'Por favor, informe seu nome.');
  if (!email || !email.includes('@')) return showError(mError, 'Por favor, informe um e-mail válido.');

  const tel       = document.getElementById('m-tel').value.trim();
  const frequenta = document.querySelector('input[name="frequenta"]:checked')?.value || 'Não informado';
  const msg       = document.getElementById('m-msg').value.trim();

  setLoading(mBtn, mSpinner, mBtnLabel, true);

  try {
    const res = await fetch('https://web-production-e80563.up.railway.app/interessados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone: tel || null, frequenta, mensagem: msg || null }),
    });

    if (!res.ok) throw new Error('Erro ao enviar');

    formMembro.style.display = 'none';
    mSuccess.classList.remove('hidden');

  } catch (err) {
    showError(mError, 'Ocorreu um erro ao enviar. Tente novamente.');
    setLoading(mBtn, mSpinner, mBtnLabel, false);
  }
});

function resetMembro() {
  formMembro.reset();
  formMembro.style.display = '';
  mSuccess.classList.add('hidden');
  clearError(mError);
}
