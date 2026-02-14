// Main JavaScript for Erfan Zabeh Personal Website

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeSmoothScroll();
  initBackToTop();
  initMobileMenu();
  initBannerShrink();
});

// Banner shrink on scroll
function initBannerShrink() {
  const banner = document.querySelector('.header-banner');
  const img = banner ? banner.querySelector('img') : null;
  const name = banner ? banner.querySelector('.banner-name') : null;
  const header = document.querySelector('header');
  if (!banner || !img || !header) return;

  function setup() {
    const headerHeight = header.offsetHeight;
    // Pull banner up behind the sticky header
    banner.style.marginTop = -headerHeight + 'px';

    const maxHeight = img.naturalHeight ? (img.offsetHeight || img.naturalHeight) : 300;
    const minHeight = 0;
    const scrollRange = 400;

    banner.style.height = maxHeight + 'px';

    function onScroll() {
      const scrollY = window.scrollY;
      const ratio = Math.min(scrollY / scrollRange, 1);
      const newHeight = maxHeight - (maxHeight - minHeight) * ratio;
      banner.style.height = newHeight + 'px';

      // Fade the banner name
      if (name) {
        name.style.opacity = Math.max(1 - (scrollY / (scrollRange * 0.5)), 0);
      }

      // Toggle header background: transparent on banner, solid when scrolled
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // run once to set initial state
  }

  if (img.complete) {
    setup();
  } else {
    img.addEventListener('load', setup);
  }

  window.addEventListener('resize', function() {
    const headerHeight = header.offsetHeight;
    banner.style.marginTop = -headerHeight + 'px';
    banner.style.height = '';
    requestAnimationFrame(function() {
      banner.style.height = img.offsetHeight + 'px';
    });
  });
}

// Navigation Management
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Set active link based on current page
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || 
        (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Smooth Scrolling for anchor links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Close mobile menu if open
      document.querySelector('.nav-menu')?.classList.remove('open');
    });
  });
}

// Back-to-top button
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  function toggle() {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggle);
  toggle();

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Mobile hamburger menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

// Highlight active section in right sidebar while scrolling
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.right-sidebar .nav-links a');
  
  if (!sections.length || !navLinks.length) return;
  
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Export utilities
window.SiteUtils = {
  initScrollSpy
};
