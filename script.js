(() => {
  'use strict';

  const routes = {
    SCREEN_2: 'landing.html',
    SCREEN_4: 'register.html',
    SCREEN_6: 'login.html',
    SCREEN_7: 'dashboard.html'
  };

  const pathRoutes = {
    beranda: 'dashboard.html',
    'masuk-terminal': 'login.html',
    'misi-edukasi': 'landing.html#reality-check',
    'urgensi-siber': 'landing.html#reality-check',
    'tentang-kami': 'landing.html#tentang-kami',
    'simulasi-sql-injection': 'dashboard.html#simulator-sandbox',
    'simulasi-phishing': 'dashboard.html#katalog-serangan',
    'simulasi-brute-force': 'dashboard.html#katalog-serangan',
    'simulasi-auth-flow': 'dashboard.html#simulator-sandbox'
  };

  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function resolveLinks() {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const screen = href.match(/SCREEN_(\d+)/)?.[1];
      if (screen && routes[`SCREEN_${screen}`]) {
        link.setAttribute('href', routes[`SCREEN_${screen}`]);
      }
      const path = link.dataset.path;
      if (path && pathRoutes[path]) {
        link.setAttribute('href', pathRoutes[path]);
      }
    });
  }

  function setupAnchorFallbacks() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const label = link.textContent.trim();
        if (label) showToast(`${label}: fitur ini tersedia setelah backend autentikasi dihubungkan.`);
      });
    });
  }

  function setupRevealAnimations() {
    const candidates = document.querySelectorAll('main section, main > div > section, main form, main > div > div');
    candidates.forEach((element, index) => {
      if (!element.hasAttribute('data-reveal')) {
        element.setAttribute('data-reveal', '');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
      }
    });

    if (!('IntersectionObserver' in window)) {
      candidates.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    candidates.forEach((element) => observer.observe(element));
  }

  function setupForms() {
    document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        if (form.id === 'register-operator-form') {
          showToast('Validasi berhasil. Akun operator siap dibuat di backend.');
          return;
        }
        showToast('Autentikasi berhasil. Membuka terminal simulasi...');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
      });
    });

    document.querySelectorAll('a[href="dashboard.html"]').forEach((link) => {
      if (!/Autentikasi|Inisialisasi Akun/i.test(link.textContent)) return;
      link.addEventListener('click', (event) => {
        const form = link.closest('main')?.querySelector('form');
        if (!form || form.checkValidity()) return;
        event.preventDefault();
        form.reportValidity();
      });
    });

    document.querySelectorAll('button[type="button"]').forEach((button) => {
      if (button.id === 'toggle-pwd-btn' || button.id === 'toggle-password' || button.classList.contains('scenario-btn') || button.classList.contains('hero-tab-btn')) return;
      if (/Mulai Lab|Ambil Flag|Luncurkan Sandbox|GitHub|SSO|EduID|Kampus/i.test(button.textContent)) {
        button.addEventListener('click', () => {
          if (/Mulai Lab/i.test(button.textContent)) document.querySelector('#simulator-sandbox')?.scrollIntoView({ behavior: 'smooth' });
          else showToast(`${button.textContent.trim()}: simulasi aman siap digunakan.`);
        });
      }
    });
  }

  function init() {
    if (!document.querySelector('link[data-security-cat-style]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'style.css';
      stylesheet.dataset.securityCatStyle = 'true';
      document.head.appendChild(stylesheet);
    }
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => document.body.classList.add('page-ready'));
    resolveLinks();
    setupAnchorFallbacks();
    setupRevealAnimations();
    setupForms();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
