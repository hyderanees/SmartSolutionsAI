document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile menu toggle ──
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── Technology tabs ──
  const techTabs = document.querySelectorAll('.tech-tab');
  const techPanels = document.querySelectorAll('.tech-panel');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      techPanels.forEach(panel => {
        panel.style.display = panel.dataset.panel === target ? 'grid' : 'none';
      });
    });
  });

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── Particle background ──
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animate);
    }

    animate();
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Form validation helpers ──
  const ERROR_ICON = '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5ZM8 11.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/></svg>';

  function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('input-error');
    const msg = document.createElement('span');
    msg.className = 'form-error-msg';
    msg.innerHTML = `${ERROR_ICON} ${message}`;
    field.parentNode.appendChild(msg);
  }

  function clearFieldError(field) {
    field.classList.remove('input-error');
    const existing = field.parentNode.querySelector('.form-error-msg');
    if (existing) existing.remove();
  }

  function getFieldError(field) {
    if (field.validity.valueMissing) return 'This field is required.';
    if (field.validity.typeMismatch && field.type === 'email') return 'Please enter a valid email address.';
    if (field.validity.typeMismatch) return 'Please enter a valid value.';
    if (field.validity.patternMismatch) return 'Please match the requested format.';
    if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    return field.validationMessage || 'Invalid input.';
  }

  function validateForm(formEl) {
    let firstInvalid = null;
    formEl.querySelectorAll('input, select, textarea').forEach(field => {
      if (!field.checkValidity()) {
        showFieldError(field, getFieldError(field));
        if (!firstInvalid) firstInvalid = field;
      } else {
        clearFieldError(field);
      }
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  function attachLiveValidation(formEl) {
    formEl.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (field.classList.contains('input-error')) {
          if (field.checkValidity()) clearFieldError(field);
          else showFieldError(field, getFieldError(field));
        }
      });
      field.addEventListener('blur', () => {
        if (field.classList.contains('input-error')) {
          if (field.checkValidity()) clearFieldError(field);
          else showFieldError(field, getFieldError(field));
        }
      });
    });
  }

  function showFormSuccess(formEl, btn, message) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span>${message}</span>`;
    btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      formEl.reset();
      formEl.querySelectorAll('.input-error').forEach(f => clearFieldError(f));
    }, 3000);
  }

  // ── Contact form ──
  const form = document.getElementById('contact-form');
  if (form) {
    const subjectSelect = document.getElementById('subject');
    const otherSubjectGroup = document.getElementById('other-subject-group');
    const otherSubjectInput = document.getElementById('other-subject');

    subjectSelect.addEventListener('change', () => {
      const isOther = subjectSelect.value === 'other';
      otherSubjectGroup.style.display = isOther ? '' : 'none';
      otherSubjectInput.required = isOther;
      if (!isOther) {
        otherSubjectInput.value = '';
        clearFieldError(otherSubjectInput);
      }
    });

    attachLiveValidation(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      showFormSuccess(form, form.querySelector('.btn'), 'Message Sent!');
    });
  }

  const talentForm = document.getElementById('talent-form');
  if (talentForm) {
    const roleSelect = document.getElementById('talent-role');
    const otherRoleGroup = document.getElementById('other-role-group');
    const otherRoleInput = document.getElementById('talent-other-role');

    roleSelect.addEventListener('change', () => {
      const isOther = roleSelect.value === 'other';
      otherRoleGroup.style.display = isOther ? '' : 'none';
      otherRoleInput.required = isOther;
      if (!isOther) {
        otherRoleInput.value = '';
        clearFieldError(otherRoleInput);
      }
    });

    attachLiveValidation(talentForm);
    talentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(talentForm)) return;
      showFormSuccess(talentForm, talentForm.querySelector('.btn'), 'Request Received!');
    });
  }

  // ── Typed effect for hero ──
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const words = ['Artificial Intelligence', 'Cybersecurity', 'Cloud Solutions', 'Digital Innovation'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = words[wordIndex];
      typedEl.textContent = current.substring(0, charIndex);

      if (!isDeleting) {
        charIndex++;
        if (charIndex > current.length) {
          isDeleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      const speed = isDeleting ? 40 : 80;
      setTimeout(type, speed);
    }

    type();
  }
});
