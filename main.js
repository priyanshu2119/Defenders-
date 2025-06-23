// Main JavaScript for Solvify SPA

document.addEventListener('DOMContentLoaded', () => {
  // Helper function to show only the selected section
  function showSectionById(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.classList.remove('hidden');
        sec.scrollIntoView({ behavior: 'smooth' });
      } else {
        sec.classList.add('hidden');
      }
    });
  }

  // Navigation: Show/hide sections
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main > section');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // Prevent default anchor behavior
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const id = link.getAttribute('href').replace('#', '');
      showSectionById(id);
    });
  });
  // On page load, show only the active section
  const activeLink = document.querySelector(`.nav-links a.active`);
  if (activeLink) {
    const id = activeLink.getAttribute('href').replace('#', '');
    showSectionById(id);
  } else {
    // If no active link, show only the first section
    if (sections.length > 0) {
      showSectionById(sections[0].id);
    }
  }

  // Tool cards: open tool interface
  const toolCards = document.querySelectorAll('.tool-card');
  const toolInterface = document.getElementById('tool-interface');
  const toolContent = toolInterface?.querySelector('.tool-content');
  const toolTitle = document.getElementById('tool-title');
  const backBtn = toolInterface?.querySelector('.back-btn');
  const toolsSection = document.querySelector('.tools');
  toolCards.forEach(card => {
    card.addEventListener('click', () => {
      const tool = card.dataset.tool;
      const template = document.getElementById(`${tool}-template`);
      if (template && toolContent && toolTitle && toolInterface && toolsSection) {
        toolContent.innerHTML = '';
        toolContent.appendChild(template.content.cloneNode(true));
        toolTitle.textContent = card.querySelector('h3')?.textContent || tool.charAt(0).toUpperCase() + tool.slice(1);
        toolInterface.classList.remove('hidden');
        toolsSection.classList.add('hidden');
      } else {
        alert('Tool interface or template not found.');
      }
    });
  });
  backBtn?.addEventListener('click', () => {
    if (toolInterface && toolsSection) {
      toolInterface.classList.add('hidden');
      toolsSection.classList.remove('hidden');
    }
  });

  // Modal logic
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const loginModal = document.getElementById('login-modal');
  const signupModal = document.getElementById('signup-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  loginBtn?.addEventListener('click', () => loginModal?.classList.add('active'));
  signupBtn?.addEventListener('click', () => signupModal?.classList.add('active'));
  closeModalBtns.forEach(btn => btn.addEventListener('click', () => {
    loginModal?.classList.remove('active');
    signupModal?.classList.remove('active');
  }));
  window.addEventListener('click', e => {
    if (e.target === loginModal) loginModal?.classList.remove('active');
    if (e.target === signupModal) signupModal?.classList.remove('active');
  });

  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  mobileMenuBtn?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });
});