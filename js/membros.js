// ========================
// NAVBAR
// ========================
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));

if (navToggle) navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  if (navMenu) navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu && navMenu.classList.contains('open') ? 'hidden' : '';
});

if (navMenu) navMenu.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle && navToggle.classList.remove('open');
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
      siblings.forEach((el, idx) => setTimeout(() => el.classList.add('visible'), idx * 120));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ========================
// DATA MÍNIMA — hoje
// ========================
const dataInput = document.getElementById('v-data');
if (dataInput) dataInput.min = new Date().toISOString().split('T')[0];

// ========================
// HELPERS
// ========================
function showError(el, msg) { if (el) el.textContent = msg; }
function clearError(el) { if (el) el.textContent = ''; }

// ========================
// FORMULÁRIO DE VISITA
// ========================
const formVisita = document.getElementById('formVisita');
const vSuccess   = document.getElementById('v-success');
const vError     = document.getElementById('v-error');
const vBtn       = document.getElementById('v-btn');

if (formVisita) formVisita.addEventListener('submit', async (e) => {
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
  if (vBtn) vBtn.disabled = true;
  // Simula sucesso (EmailJS não configurado)
  if (vSuccess) { formVisita.style.display = 'none'; vSuccess.classList.remove('hidden'); }
});

function resetVisita() {
  if (formVisita) { formVisita.reset(); formVisita.style.display = ''; }
  if (vSuccess) vSuccess.classList.add('hidden');
  clearError(vError);
}

// ========================
// FORMULÁRIO DE MEMBRESIA → API
// ========================
const formMembro = document.getElementById('formMembro');
const mSuccess   = document.getElementById('m-success');
const mError     = document.getElementById('m-error');
const mBtn       = document.getElementById('m-btn');

if (formMembro) formMembro.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError(mError);
  const nome  = document.getElementById('m-nome').value.trim();
  const email = document.getElementById('m-email').value.trim();
  if (!nome)  return showError(mError, 'Por favor, informe seu nome.');
  if (!email || !email.includes('@')) return showError(mError, 'Por favor, informe um e-mail válido.');
  const tel      = document.getElementById('m-tel').value.trim();
  const checked  = document.querySelector('input[name="frequenta"]:checked');
  const frequenta = checked ? checked.value : 'Não informado';
  const msg      = document.getElementById('m-msg').value.trim();
  if (mBtn) mBtn.disabled = true;
  try {
    const res = await fetch('https://web-production-e80563.up.railway.app/interessados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone: tel || null, frequenta, mensagem: msg || null }),
    });
    if (!res.ok) throw new Error('Erro');
    if (formMembro) formMembro.style.display = 'none';
    if (mSuccess) mSuccess.classList.remove('hidden');
  } catch (err) {
    showError(mError, 'Ocorreu um erro ao enviar. Tente novamente.');
    if (mBtn) mBtn.disabled = false;
  }
});

function resetMembro() {
  if (formMembro) { formMembro.reset(); formMembro.style.display = ''; }
  if (mSuccess) mSuccess.classList.add('hidden');
  clearError(mError);
}
