    'use strict';

    /* ── Replay cascade animations on a page (for navigation, not initial load) ── */
    function triggerCascade(article) {
      article.querySelectorAll('.cascade').forEach(group => {
        Array.from(group.children).forEach(child => {
          // Reset inline delays set by page-loaded rules — use the nav delays instead
          child.style.animation = 'none';
          child.offsetHeight; // reflow
          child.style.animation = '';
          // Use normal cascade delays (0.05–0.47s) for nav between pages
          child.style.animationDelay = '';
        });
      });
    }

    /* ── Sidebar ── */
    const sidebarBtn  = document.querySelector('[data-sidebar-btn]');
    const sidebarMore = document.querySelector('[data-sidebar-more]');
    sidebarBtn.addEventListener('click', () => {
      sidebarMore.classList.toggle('active');
      const span    = sidebarBtn.querySelector('span');
      const chevron = sidebarBtn.querySelectorAll('i')[1];
      const open    = sidebarMore.classList.contains('active');
      span.textContent   = open ? 'Ocultar contacto' : 'Ver contacto';
      chevron.className  = open ? 'fa-solid fa-angles-up' : 'fa-solid fa-angles-down';
      Object.assign(chevron.style, { marginLeft:'auto', fontSize:'0.72rem' });
    });

    /* ── Navigation ── */
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const pages    = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        const text = (this.querySelector('span') || this).innerText.toLowerCase();
        pages.forEach((page, i) => {
          if (page.dataset.page === text) {
            page.classList.add('active'); navLinks[i].classList.add('active');
            triggerCascade(page); window.scrollTo(0, 0);
          } else {
            page.classList.remove('active'); navLinks[i].classList.remove('active');
          }
        });
      });
    });

    /* Modal */
    const testimonialItems = document.querySelectorAll('[data-testimonials-item]');
    const modalContainer   = document.querySelector('[data-modal-container]');
    const overlay          = document.querySelector('[data-overlay]');
    const modalCloseBtn    = document.querySelector('[data-modal-close-btn]');
    const modalAvatar  = document.querySelector('[data-modal-avatar]');
    const modalTitle   = document.querySelector('[data-modal-title]');
    const modalRole    = document.querySelector('[data-modal-role]');
    const modalText    = document.querySelector('[data-modal-text]');

    testimonialItems.forEach(item => {
      item.addEventListener('click', function () {
        modalAvatar.textContent = this.querySelector('[data-testimonials-avatar]').dataset.initials;
        modalTitle.textContent  = this.querySelector('[data-testimonials-title]').textContent;
        modalRole.textContent   = this.querySelector('[data-testimonials-role]')?.textContent || '';
        modalText.textContent   = this.querySelector('[data-testimonials-text]').textContent;
        modalContainer.classList.add('active');
      });
    });
    const closeModal = () => modalContainer.classList.remove('active');
    modalCloseBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    /* Filter */
    const filterBtns  = document.querySelectorAll('[data-filter-btn]');
    const filterItems = document.querySelectorAll('[data-filter-item]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const val = this.textContent.trim().toLowerCase();
        let d = 0;
        filterItems.forEach(item => {
          const show = val === 'todos' || item.dataset.category === val;
          item.classList.toggle('active', show);
          item.style.animationDelay = show ? (d++ * 0.07) + 's' : '0s';
        });
      });
    });

    /* Form */
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn    = document.querySelector('[data-form-btn]');
    const checkForm  = () => { formBtn.disabled = ![...formInputs].filter(i=>i.required).every(i=>i.value.trim()); };
    formInputs.forEach(i => i.addEventListener('input', checkForm));
    formBtn.setAttribute('disabled','');
    formBtn.addEventListener('click', () => {
      formBtn.innerHTML = '<i class="fa-duotone fa-solid fa-circle-check" style="--fa-primary-color:#fff;--fa-secondary-color:rgba(255,255,255,0.5);"></i> Mensaje enviado';
      formBtn.disabled = true;
    });

    /* ── Preloader ── */
    window.addEventListener('load', () => {
      const pre = document.getElementById('preloader');
      setTimeout(() => {
        pre.classList.add('fade-out');
        setTimeout(() => {
          pre.remove();
          // Añadir clase que dispara todas las animaciones de entrada via CSS
          // No llamamos triggerCascade — el CSS con .page-loaded lo maneja todo
          document.body.classList.add('page-loaded');
        }, 700);
      }, 2200);
    });