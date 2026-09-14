// assets/ui.js — pola CVA / component ownership (Modul 1-2)
// ponytail: varian manual tanpa lib cva; upgrade ke class-variance-authority saat pindah ke React/TS.
(() => {
  'use strict';

  const baseButton = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] disabled:opacity-50 disabled:pointer-events-none';

  const buttonVariants = {
    variant: {
      default: 'bg-[#00f0ff] text-[#00363a] hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.35)]',
      secondary: 'bg-[#1c1f2a] text-[#dbfcff] hover:bg-[#262a35] border border-[#3b494b]',
      destructive: 'bg-[#93000a] text-[#ffdad6] hover:brightness-125',
      outline: 'border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10',
      ghost: 'text-[#b9cacb] hover:text-[#dbfcff] hover:bg-[#262a35]'
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      default: 'h-10 px-4 py-2 text-sm',
      lg: 'h-11 px-6 text-base',
      icon: 'h-10 w-10'
    }
  };

  function buttonClass({ variant = 'default', size = 'default' } = {}) {
    return `${baseButton} ${buttonVariants.variant[variant] || buttonVariants.variant.default} ${buttonVariants.size[size] || buttonVariants.size.default}`;
  }

  const badgeVariants = {
    priority: {
      'Tinggi': 'bg-red-500/15 text-[#ffb4ab] border-red-500/30',
      'Sedang': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      'Rendah': 'bg-emerald-500/15 text-[#6ffbbe] border-emerald-500/30'
    },
    status: {
      'Selesai': 'bg-emerald-500/15 text-[#6ffbbe] border-emerald-500/30',
      'Aktif': 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30',
      'Arsip': 'bg-[#262a35] text-[#b9cacb] border-[#3b494b]'
    },
    difficulty: {
      'Beginner': 'bg-emerald-500/15 text-[#6ffbbe] border-emerald-500/30',
      'Intermediate': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      'Advanced': 'bg-red-500/15 text-[#ffb4ab] border-red-500/30'
    }
  };

  function badgeClass(text, type) {
    const v = (badgeVariants[type] && badgeVariants[type][text]) || 'bg-[#262a35] text-[#b9cacb] border-[#3b494b]';
    return `inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${v}`;
  }

  function cardClass(extra = '') {
    return `rounded-xl border border-[#3b494b]/50 bg-[#1c1f2a] shadow-md ${extra}`;
  }

  function showToast(message, type = 'info') {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.dataset.type = type;
    toast.classList.add('is-visible');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
  }

  window.SecurityCatUI = { buttonClass, badgeClass, cardClass, showToast, escapeHtml };
})();
