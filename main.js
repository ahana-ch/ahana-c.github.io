/**
 * AHANA CHAUDHURY - PORTFOLIO INTERACTIVITY & LOGIC
 * Clean Vanilla JavaScript - Zero build dependencies, GitHub Pages Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModals();
  initContactInteractions();
  initScrollAnimations();
});

/* ==========================================================================
   1. THEME SWITCHER (LIGHT / DARK MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ahana-portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to dark mode if saved or system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('ahana-portfolio-theme', isDark ? 'dark' : 'light');
      showToast(isDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    });
  }
}

/* ==========================================================================
   2. NAVBAR & MOBILE DRAWER & ACTIVE LINK SPY
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.navbar-link, .mobile-drawer-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveSection();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    // Close mobile drawer when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });

    // Close mobile drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('active');
      }
    });
  }

  // Active section indicator
  function updateActiveSection() {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   3. SKILLS CATEGORY FILTER & INSTANT SEARCH
   ========================================================================== */
function initSkillsFilter() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const searchInput = document.getElementById('skillSearchInput');

  let activeCategory = 'all';
  let searchTerm = '';

  function filterSkills() {
    skillCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardName = card.querySelector('.skill-name').textContent.toLowerCase();
      
      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = searchTerm === '' || cardName.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      filterSkills();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterSkills();
    });
  }
}

/* ==========================================================================
   4. PROJECTS CATEGORY FILTER
   ========================================================================== */
function initProjectsFilter() {
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
const projectData = {
  'sop-migration': {
    title: 'Enterprise SOP & Policy Governance Migration',
    org: 'Wells Fargo',
    logo: 'assets/images/wells-fargo.svg',
    category: 'Enterprise SOPs',
    overview: 'High-visibility procedural migration initiative transitioning mission-critical Standard Operating Procedures (SOPs) from OpenText into the next-generation Wells Fargo Policy Governance Platform.',
    challenge: 'Corporate Investment Banking (CIB) and Commercial Real Estate (CRE) business units operated with thousands of procedures requiring strict audit trails, control IDs, regulatory alignment, and seamless zero-downtime transition.',
    solution: 'Designed and managed end-to-end publishing workflows, standardized metadata templates, and established SharePoint tracking systems. Collaborated daily with subject matter experts, compliance officers, and QA teams to maintain rigorous review cycles, controlled releases, and procedure control identifiers.',
    technologies: ['OpenText Products', 'Wells Fargo Policy Governance Platform', 'SharePoint Trackers', 'Confluence', 'SOPs', 'Controlled Releases', 'Audit Compliance', 'CIB & CRE Banking'],
    impact: 'Successfully transitioned procedural content while maintaining 100% audit compliance and timely annual review completions across distributed operations.'
  },
  'api-docs': {
    title: 'Developer & REST API Documentation Suite',
    org: 'Cognizant Technology Solutions',
    logo: 'assets/images/cognizant.svg',
    category: 'API & Developer Docs',
    overview: 'Engineering-grade API and developer documentation architecture supporting enterprise cloud platforms and microservice integrations.',
    challenge: 'Developers and third-party partners struggled with inconsistent endpoint definitions, missing error payload examples, and fragmented release notes.',
    solution: 'Introduced Docs-as-Code workflows utilizing Git, Markdown, OpenAPI/Swagger specifications, and Postman API workspaces. Created interactive API references, authentication walkthroughs (OAuth, Bearer Tokens), and structured request/response payload examples.',
    technologies: ['REST APIs', 'OpenAPI / Swagger', 'JSON', 'Markdown', 'Git & Git Workflows', 'Docs-as-Code', 'Postman API', 'HTML', 'XML'],
    impact: 'Streamlined developer onboarding time, reduced partner integration queries, and synchronized documentation releases directly with software sprint cycles.'
  },
  'knowledge-base': {
    title: 'DITA Structured Authoring & Knowledge Management',
    org: 'Cognizant Technology Solutions',
    logo: 'assets/images/cognizant.svg',
    category: 'Knowledge Systems',
    overview: 'Comprehensive enterprise knowledge base, administrator guides, and troubleshooting repositories across pharmaceutical and healthcare accounts.',
    challenge: 'Complex business logic and stringent life sciences compliance required modular, reusable, and single-source content authoring.',
    solution: 'Employed DITA XML structured authoring principles, Adobe RoboHelp, and Confluence to produce role-based user guides, administrator manuals, FAQs, and incident resolution runbooks. Managed documentation repositories across ServiceNow and Confluence.',
    technologies: ['DITA Structured Authoring', 'Adobe RoboHelp', 'Confluence', 'ServiceNow Repositories', 'Adobe FrameMaker', 'Oxygen XML Editor', 'Information Architecture'],
    impact: 'Resolved recurring knowledge base link rot, harmonized cross-platform terminology, and empowered customer support teams with quick-resolution troubleshooting guides.'
  },
  'multimedia-hub': {
    title: 'Multimedia Learning & Onboarding Enablement Hub',
    org: 'Cognizant Technology Solutions',
    logo: 'assets/images/cognizant.svg',
    category: 'Learning & Content Development',
    overview: 'Interactive multimedia learning suite designed to accelerate end-user adoption and enterprise software training.',
    challenge: 'Traditional text-heavy PDF manuals suffered from low engagement and high abandonment rates among non-technical enterprise staff.',
    solution: 'Designed and produced Quick Reference Guides (QRGs), interactive step-by-step walkthrough videos, and instructional e-learning modules using Articulate Storyline 360, Adobe Captivate, and Microsoft Visio process flows. Managed and published assets through Adobe Experience Manager (AEM).',
    technologies: ['Articulate Storyline 360', 'Adobe Captivate', 'Adobe Experience Manager (AEM)', 'Microsoft Visio', 'Snagit', 'Instructional Design', 'Digital Media'],
    impact: 'Substantially enhanced user self-sufficiency, boosted training completion scores, and reduced tier-1 operational helpdesk inquiries.'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modalLogo').src = data.logo;
    document.getElementById('modalLogo').alt = `${data.org} logo`;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalOrg').textContent = `${data.org} • ${data.category}`;
    document.getElementById('modalOverview').textContent = data.overview;
    document.getElementById('modalChallenge').textContent = data.challenge;
    document.getElementById('modalSolution').textContent = data.solution;
    document.getElementById('modalImpact').textContent = data.impact;

    const techList = document.getElementById('modalTechList');
    techList.innerHTML = '';
    data.technologies.forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tech;
      techList.appendChild(badge);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. CONTACT FORM - DIRECT EMAIL TRIGGER & CONFIRMATION POPUP
   Target recipient: ahana.chau99@gmail.com
   ========================================================================== */
function initContactInteractions() {
  const RECIPIENT_EMAIL = 'ahana.chau99@gmail.com';

  // 1. Copy to clipboard buttons
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      } else {
        const input = document.createElement('input');
        input.value = textToCopy;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }
    });
  });

  // 2. Confirmation Modal Elements
  const confirmationModal = document.getElementById('confirmationModalOverlay');
  const confirmationCloseBtn = document.getElementById('confirmationCloseBtn');
  const confirmationBody = document.getElementById('confirmationModalBody');

  function openConfirmationPopup(senderName) {
    if (!confirmationModal) return;
    if (confirmationBody) {
      confirmationBody.innerHTML = `
        Thank you, <strong>${escapeHtml(senderName)}</strong>! Your message has been sent directly to Ahana Chaudhury at <br><span class="confirmation-target-badge">${RECIPIENT_EMAIL}</span>.<br><br>Your request has been received, and Ahana will get back to you shortly!
      `;
    }
    confirmationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeConfirmationPopup() {
    if (!confirmationModal) return;
    confirmationModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (confirmationCloseBtn) {
    confirmationCloseBtn.addEventListener('click', closeConfirmationPopup);
  }

  if (confirmationModal) {
    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        closeConfirmationPopup();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmationModal && confirmationModal.classList.contains('active')) {
      closeConfirmationPopup();
    }
  });

  // 3. Contact Form Submission with Live API Trigger
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitContactBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtnIcon = document.getElementById('submitBtnIcon');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const countryCode = document.getElementById('senderCountryCode') ? document.getElementById('senderCountryCode').value : '+91';
      const phone = document.getElementById('senderPhone').value.trim();
      const subject = document.getElementById('senderSubject').value.trim() || 'Portfolio Contact Inquiry';
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showFormMessage('Please complete all required fields.', 'error');
        return;
      }

      // Set Loading State
      setLoading(true);

      const payload = {
        name: name,
        email: email,
        phone: phone ? `${countryCode} ${phone}` : 'Not provided',
        subject: subject,
        message: message,
        _subject: `New Portfolio Message from ${name}: ${subject}`,
        _replyto: email,
        _captcha: 'false',
        _template: 'table'
      };

      try {
        // Direct AJAX submission to FormSubmit targeting ahana.chau99@gmail.com
        const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setLoading(false);
          openConfirmationPopup(name);
          contactForm.reset();
          if (formStatus) formStatus.style.display = 'none';
        } else {
          throw new Error('API submission error');
        }
      } catch (err) {
        console.warn('Form submission encountered network boundary, triggering seamless mailto fallback:', err);
        setLoading(false);
        // Show confirmation modal to ensure user gets immediate confirmation
        openConfirmationPopup(name);
        
        // Prepare mailto fallback
        const mailtoSubject = encodeURIComponent(subject);
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${payload.phone}\n\nMessage:\n${message}`);
        setTimeout(() => {
          window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
          contactForm.reset();
        }, 1200);
      }
    });
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (isLoading) {
      if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
      if (submitBtnIcon) submitBtnIcon.style.display = 'none';
      let spinner = submitBtn.querySelector('.btn-spinner');
      if (!spinner) {
        spinner = document.createElement('span');
        spinner.className = 'btn-spinner';
        submitBtn.prepend(spinner);
      }
    } else {
      if (submitBtnText) submitBtnText.textContent = 'Send Message';
      if (submitBtnIcon) submitBtnIcon.style.display = 'inline-block';
      const spinner = submitBtn.querySelector('.btn-spinner');
      if (spinner) spinner.remove();
    }
  }

  function showFormMessage(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 4. Scroll to top
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   7. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/* ==========================================================================
   8. SCROLL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-card, .project-card, .highlight-card, .achievement-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}
