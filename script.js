/* ==========================================================================
   SCRIPT.JS - SAMUEL Auto Dealership & Portfolio Interactive Features
   Features: Responsive Nav, Dynamic Vehicle Filters, Dynamic Details Modal,
             Real-time Form Validation, Stats Counter Animation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Interactive Navigation (Mobile Hamburger Menu)
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;'; // Switch X / Hamburger icon
    });

    // Close mobile menu when clicking any navigation link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '&#9776;';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Dynamic Content Button & Filtering (Vehicles Inventory)
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card');
  const filterStatusText = document.getElementById('filter-status');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and highlight clicked button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');
      let visibleCount = 0;

      // Conditional check to show or hide car items based on category
      carCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Dynamic content update: Update status message on screen
      if (filterStatusText) {
        filterStatusText.textContent = `Showing ${visibleCount} ${filterValue === 'all' ? 'total' : filterValue} vehicle(s) on offer.`;
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. Dynamic Content Modal (Vehicle Quick View)
     ------------------------------------------------------------------------ */
  const modal = document.getElementById('car-modal');
  const modalBody = document.getElementById('modal-body-content');
  const closeModalBtn = document.querySelector('.close-modal');

  // Event Delegation for "View Details" buttons
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('view-details-btn')) {
      const card = e.target.closest('.car-card');
      
      const title = card.querySelector('.car-title').textContent;
      const price = card.querySelector('.car-price').textContent;
      const imgSrc = card.querySelector('img').src;
      const tag = card.querySelector('.car-tag').textContent;
      const specs = card.querySelector('.car-specs').innerHTML;

      // Dynamic DOM Generation inside Modal
      modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
          <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px;">
          <span style="display:inline-block; margin-top:0.8rem; background: rgba(197, 160, 89, 0.2); color: #c5a059; padding: 0.2rem 0.8rem; border-radius:4px; font-size:0.85rem;">${tag}</span>
        </div>
        <h3 style="font-size: 1.6rem; color: #f0f2f5; margin-bottom: 0.5rem;">${title}</h3>
        <p style="font-size: 1.4rem; color: #c5a059; font-weight: bold; margin-bottom: 1rem;">${price}</p>
        <div style="display:flex; justify-content:space-around; background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius:6px; margin-bottom: 1rem;">
          ${specs}
        </div>
        <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.5;">
          This luxury vehicle comes with a full dealership inspection report, extended warranty coverage options, and ready for immediate delivery.
        </p>
      `;

      modal.style.display = 'flex';
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  /* ------------------------------------------------------------------------
     4. Form Validation (Contact Form)
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('dealership-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page refresh

      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');
      const inquiryType = document.getElementById('inquiry-type');
      const messageInput = document.getElementById('client-message');

      // Clear previous feedback styles
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';

      // Validation logic with helper function
      const nameValid = nameInput.value.trim().length >= 2;
      const emailValid = validateEmail(emailInput.value.trim());
      const messageValid = messageInput.value.trim().length >= 10;

      if (!nameValid) {
        showFeedback('Please enter your full name (at least 2 characters).', 'error');
        nameInput.focus();
        return;
      }

      if (!emailValid) {
        showFeedback('Please enter a valid email address (e.g., name@domain.com).', 'error');
        emailInput.focus();
        return;
      }

      if (inquiryType.value === '') {
        showFeedback('Please select an inquiry topic from the dropdown.', 'error');
        inquiryType.focus();
        return;
      }

      if (!messageValid) {
        showFeedback('Please include a brief message (at least 10 characters).', 'error');
        messageInput.focus();
        return;
      }

      // Success dynamic state
      showFeedback(`Thank you, ${nameInput.value.trim()}! Your inquiry regarding "${inquiryType.value}" has been sent successfully. We will get back to you shortly.`, 'success');
      contactForm.reset();
    });
  }

  // Email Regex Validator Function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Feedback display function
  function showFeedback(msg, type) {
    if (formFeedback) {
      formFeedback.textContent = msg;
      formFeedback.classList.add(type);
    }
  }

});
