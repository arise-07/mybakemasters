/* ==========================================
   BAKE MASTERS - Main JavaScript
   Vanilla JS - All interactions
   ========================================== */

(function () {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    whatsappNumber: '917548871030', // Bake Masters WhatsApp order number
    businessName: 'Bake Masters',
    defaultMessage: "Hello Bake Masters, I'd like to place an order."
  };

  // ============================================
  // DOM READY
  // ============================================
  document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollEffects();
    initScrollReveal();
    initScrollToTop();
    initWhatsAppLinks();
    initCakeOrderForm();
    initBulkOrderForm();
    initContactForm();
    initSmoothScroll();
    initLazyLoading();
    setActiveNavLink();
  });

  // ============================================
  // NAVIGATION (Hamburger menu)
  // ============================================
  function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
      document.body.style.overflow = expanded ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // SCROLL EFFECTS (sticky nav shadow)
  // ============================================
  function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  }

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  function initScrollToTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    const toggle = () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    };

    window.addEventListener('scroll', toggle, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // WHATSAPP LINKS (generic order buttons)
  // ============================================
  function initWhatsAppLinks() {
    const buttons = document.querySelectorAll('[data-whatsapp]');

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const customMsg = btn.getAttribute('data-whatsapp-msg') || CONFIG.defaultMessage;
        openWhatsApp(customMsg);
      });
    });
  }

  // Build and open WhatsApp URL
  function openWhatsApp(message) {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener');
  }

  // ============================================
  // CUSTOM CAKE ORDER FORM
  // ============================================
  function initCakeOrderForm() {
    const form = document.getElementById('cakeOrderForm');
    if (!form) return;

    const modal = document.getElementById('cakeOrderModal');
    const continueBtn = document.getElementById('modalContinueBtn');
    const cancelBtn = document.getElementById('modalCancelBtn');
    let pendingMessage = '';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get all fields
      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const cakeText = form.querySelector('[name="cakeText"]').value.trim();
      const size = form.querySelector('[name="size"]').value;
      const type = form.querySelector('[name="type"]').value;
      const message = form.querySelector('[name="message"]').value.trim();

      // Basic validation
      if (!validateField(form, 'name', name, 'Please enter your name')) return;
      if (!validateField(form, 'phone', phone, 'Please enter your contact number')) return;
      if (!validatePhone(form, 'phone', phone)) return;
      if (!validateField(form, 'size', size, 'Please select cake size')) return;
      if (!validateField(form, 'type', type, 'Please select cake type')) return;

      // Build the WhatsApp message
      const lines = [
        `🎂 *New Custom Cake Order*`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Contact:* ${phone}`,
        `⚖️ *Size:* ${size}`,
        `🍫 *Type:* ${type}`,
      ];

      if (cakeText) lines.push(`✍️ *Text on Cake:* ${cakeText}`);
      if (message) lines.push(`💬 *Special Instructions:* ${message}`);
      lines.push(``, `_Sent from Bake Masters website_`);

      pendingMessage = lines.join('\n');

      // Since a WhatsApp link can't carry an attached photo automatically,
      // remind the customer to attach their reference image in the chat
      // before we redirect them there.
      if (modal) {
        openModal(modal);
      } else {
        openWhatsApp(pendingMessage);
        showToast('Opening WhatsApp...');
      }
    });

    if (modal && continueBtn) {
      continueBtn.addEventListener('click', () => {
        closeModal(modal);
        if (pendingMessage) openWhatsApp(pendingMessage);
      });
    }

    if (modal && cancelBtn) {
      cancelBtn.addEventListener('click', () => closeModal(modal));
    }

    // Close on backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  }

  // ============================================
  // MODAL HELPERS
  // ============================================
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ============================================
  // BULK ORDER FORM
  // ============================================
  function initBulkOrderForm() {
    const form = document.getElementById('bulkOrderForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const eventType = form.querySelector('[name="eventType"]').value;
      const eventDate = form.querySelector('[name="eventDate"]').value;
      const message = form.querySelector('[name="message"]').value.trim();

      if (!validateField(form, 'name', name, 'Please enter your name')) return;
      if (!validateField(form, 'phone', phone, 'Please enter your contact number')) return;
      if (!validatePhone(form, 'phone', phone)) return;
      if (!validateField(form, 'message', message, 'Please describe your requirements')) return;

      const lines = [
        `📦 *Bulk Order Inquiry*`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Contact:* ${phone}`,
      ];

      if (email) lines.push(`📧 *Email:* ${email}`);
      if (eventType) lines.push(`🎉 *Event Type:* ${eventType}`);
      if (eventDate) lines.push(`📅 *Event Date:* ${eventDate}`);
      lines.push(`💬 *Requirements:* ${message}`);
      lines.push(``, `_Sent from Bake Masters website_`);

      openWhatsApp(lines.join('\n'));
      showToast('Opening WhatsApp...');
    });
  }

  // ============================================
  // CONTACT FORM
  // ============================================
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!validateField(form, 'name', name, 'Please enter your name')) return;
      if (!validateField(form, 'phone', phone, 'Please enter your phone number')) return;
      if (!validatePhone(form, 'phone', phone)) return;
      if (email && !validateEmail(form, 'email', email)) return;
      if (!validateField(form, 'message', message, 'Please write a message')) return;

      const lines = [
        `💌 *Contact Form Submission*`,
        ``,
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
      ];

      if (email) lines.push(`📧 *Email:* ${email}`);
      lines.push(`💬 *Message:* ${message}`);
      lines.push(``, `_Sent from Bake Masters website_`);

      openWhatsApp(lines.join('\n'));
      showToast('Message sent! Opening WhatsApp...');
      form.reset();
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    // Native lazy loading is set via loading="lazy" attribute
    // Fallback for browsers without support
    if ('loading' in HTMLImageElement.prototype) return;

    const images = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => observer.observe(img));
  }

  // ============================================
  // SET ACTIVE NAV LINK
  // ============================================
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = href.split('/').pop();
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // VALIDATION HELPERS
  // ============================================
  function validateField(form, fieldName, value, errorMsg) {
    const errorEl = form.querySelector(`[data-error="${fieldName}"]`);
    if (!value) {
      if (errorEl) errorEl.textContent = errorMsg;
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input) input.focus();
      return false;
    }
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  function validatePhone(form, fieldName, value) {
    const errorEl = form.querySelector(`[data-error="${fieldName}"]`);
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) {
      if (errorEl) errorEl.textContent = 'Please enter a valid phone number';
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input) input.focus();
      return false;
    }
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  function validateEmail(form, fieldName, value) {
    const errorEl = form.querySelector(`[data-error="${fieldName}"]`);
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      if (errorEl) errorEl.textContent = 'Please enter a valid email address';
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input) input.focus();
      return false;
    }
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    toast.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${message}</span>`;
    toast.style.background = type === 'error' ? 'var(--color-error)' : 'var(--color-whatsapp)';

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Expose openWhatsApp for inline use
  window.BakeMasters = { openWhatsApp };

})();