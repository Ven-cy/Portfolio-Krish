// Animations Manager - Handles particles, parallax, and interactive animations

const AnimationsManager = {
  init() {
    this.initParticles();
    this.initParallax();
    this.initSocialCards();
    this.initProjectCards();
  },

  initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const home = document.getElementById('home');

    if (!canvas || !home) return;

    let ctx, particles = [], w = 0, h = 0, rafId;

    const resize = () => {
      w = canvas.width = home.clientWidth;
      h = canvas.height = home.clientHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.max(20, Math.floor((w * h) / 60000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: 0.08 + Math.random() * 0.15
        });
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gradient.addColorStop(0, `rgba(255,255,255,${p.alpha * 1.5})`);
        gradient.addColorStop(0.5, `rgba(99,102,241,${p.alpha})`);
        gradient.addColorStop(1, `rgba(99,102,241,0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(loop);
    };

    ctx = canvas.getContext('2d');
    resize();
    createParticles();
    rafId = requestAnimationFrame(loop);

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  },

  initParallax() {
    const home = document.getElementById('home');
    const blobs = document.querySelectorAll('.blob');

    if (!home) return;

    const handlePointer = (e) => {
      const rect = home.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / rect.width;
      const py = (e.clientY - cy) / rect.height;

      // Hero parallax
      const heroContainer = document.querySelector('.hero-container');
      if (heroContainer) {
        const txHero = px * 12;
        const tyHero = py * 10;
        heroContainer.style.transform = `translate3d(${txHero}px, ${tyHero}px, 0)`;
      }

      // Profile card parallax
      const profile = document.querySelector('.profile-card');
      if (profile) {
        const txP = px * 10;
        const tyP = py * 8;
        profile.style.transform = `translate3d(${txP}px, ${tyP}px, 0) rotateY(${px * 3}deg)`;
      }

      // Blob parallax
      blobs.forEach((b, i) => {
        const depth = (i + 1) * 6;
        const tx = px * depth;
        const ty = py * depth;
        b.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${i * 6}deg)`;
      });
    };

    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) handlePointer(e.touches[0]);
    }, { passive: true });
  },

  initSocialCards() {
    document.querySelectorAll('.social-card').forEach(card => {
      card.addEventListener('mousemove', (ev) => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        const rotY = px * 10;
        const rotX = -py * 8;
        card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      card.addEventListener('click', () => {
        card.classList.toggle('flip');
      });
    });
  },

  initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (ev) => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        const rotY = px * 6;
        const rotX = -py * 4;
        card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      card.addEventListener('blur', () => {
        card.style.transform = '';
      });
    });
  }
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AnimationsManager.init());
} else {
  AnimationsManager.init();
}

// Make available globally
window.AnimationsManager = AnimationsManager;
