/* ==========================================================================
   Rohan Singh - BTech CSE Portfolio Website
   Master Client-Side JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Feather Icons if available
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // 1. Dynamic Footer Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Navbar Scroll Behavior
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Scroll Active Navigation Link Highlighting (IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 5. Modal Document Viewer Logic (For Certificates & Internship Proof)
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openModal = function(fileUrl, type, title) {
    if (!modalOverlay || !modalBody || !modalTitle) return;

    modalTitle.textContent = title || 'Document Preview';
    modalBody.innerHTML = '';

    if (type === 'image') {
      const img = document.createElement('img');
      img.src = fileUrl;
      img.alt = title || 'Document Image';
      modalBody.appendChild(img);
    } else if (type === 'pdf') {
      const objectTag = document.createElement('object');
      objectTag.data = `${fileUrl}#toolbar=0&navpanes=0`;
      objectTag.type = 'application/pdf';

      const iframe = document.createElement('iframe');
      iframe.src = `${fileUrl}#toolbar=0`;
      iframe.title = title || 'PDF Viewer';

      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'pdf-fallback';
      fallbackDiv.innerHTML = `
        <p class="pdf-fallback-text">Direct preview unavailable in your browser window.</p>
        <a href="${fileUrl}" target="_blank" class="btn btn-primary">Open ${title} in New Tab</a>
      `;

      iframe.appendChild(fallbackDiv);
      objectTag.appendChild(iframe);
      modalBody.appendChild(objectTag);
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  window.closeModal = function() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', window.closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        window.closeModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      window.closeModal();
    }
  });

  // 6. Toast Notification Function
  window.showToast = function(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };
});
