// ========================
// CORDA DE EZEQUIEL
// Scroll-driven depth meter inspired by Ezekiel 47
// ========================
(function () {
  const meter  = document.getElementById('depthMeter');
  const fill   = document.getElementById('depthFill');
  const cursor = document.getElementById('depthCursor');
  const ripple = document.getElementById('depthRipple');
  const marks  = document.querySelectorAll('.depth-meter__mark');

  if (!meter || !fill || !cursor) return;

  const HERO_FADE_IN = 0.6;

  function fireRipple() {
    ripple.classList.remove('fire');
    void ripple.offsetWidth; // reflow para reiniciar animação
    ripple.classList.add('fire');
  }

  function onScroll() {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = Math.min(scrolled / maxScroll, 1);
    const pct      = (progress * 100).toFixed(2) + '%';

    fill.style.height = pct;
    cursor.style.top  = pct;

    meter.classList.toggle('visible', scrolled > window.innerHeight * HERO_FADE_IN);

    // Bidirecional: aparece descendo, desaparece subindo
    marks.forEach(mark => {
      const threshold  = parseFloat(mark.dataset.threshold);
      const wasReached = mark.classList.contains('reached');
      const isReached  = progress >= threshold;

      if (isReached && !wasReached) {
        mark.classList.add('reached');
        fireRipple();
      } else if (!isReached && wasReached) {
        mark.classList.remove('reached');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
