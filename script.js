// Interactive Logic for Fastrack Edu Hub Single Page Application

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll detection
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }

  // 3. Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if (icon) icon.className = 'fas fa-bars';
          }
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 4. Modal handling
  const enquiryModal = document.getElementById('enquiryModal');
  const modalClose = document.getElementById('modalClose');
  const selectedCourseInput = document.getElementById('selectedCourseInput');

  window.openModal = function(courseName = '') {
    if (selectedCourseInput) {
      selectedCourseInput.value = courseName || 'General Inquiry';
    }
    if (enquiryModal) {
      enquiryModal.classList.add('active');
    }
  };

  window.closeModal = function() {
    if (enquiryModal) {
      enquiryModal.classList.remove('active');
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        closeModal();
      }
    });
  }

  // 5. Course Item Click Event -> Open Modal prefilled
  document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', () => {
      const text = item.innerText.replace('↗', '').trim();
      openModal(text);
    });
  });

  // 6. Form Submission Handling
  const enquiryForm = document.getElementById('enquiryForm');
  const toastMsg = document.getElementById('toastMsg');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Thank you! Your inquiry has been submitted. Our advisor will contact you shortly.');
      enquiryForm.reset();
    });
  }

  window.showToast = function(msg) {
    if (toastMsg) {
      toastMsg.innerText = msg;
      toastMsg.classList.add('show');
      setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 4000);
    }
  };
});
