/**
 * Nexus Dynamics - Premium Digital Agency
 * Main JavaScript File
 * 
 * Features:
 * - Preloader with progress animation
 * - Custom cursor effects
 * - Particle.js background
 * - Smooth scrolling
 * - Scroll animations
 * - Responsive navigation
 * - Hero background slideshow
 * - Client marquee animation
 * - Service card animations
 * - Portfolio filtering
 * - Testimonial slider
 * - Counter animations
 * - Contact form validation
 * - Back to top button
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Remove preload class to enable animations
  document.body.classList.remove('preload');
  
  // Initialize all components
  initPreloader();
  initCursor();
  initParticles();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
  initHeroSlideshow();
  initClientsMarquee();
  initServiceCards();
  initPortfolioFilter();
  initTestimonialSlider();
  initCounters();
  initContactForm();
  initBackToTop();
  initCurrentYear();
});

/**
 * PRELOADER
 * Shows loading progress and animates out when page is loaded
 */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.preloader-progress .progress-bar');
  const counter = document.querySelector('.preloader-counter');
  
  if (!preloader) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    
    progressBar.style.width = `${progress}%`;
    counter.textContent = `${progress}%`;
  }, 50);
  
  window.addEventListener('load', () => {
    // Ensure we show 100% before hiding
    progressBar.style.width = '100%';
    counter.textContent = '100%';
    
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      
      // Animate hero content after preloader hides
      animateHeroContent();
    }, 500);
  });
}

/**
 * CUSTOM CURSOR
 * Creates custom cursor effects that follow the mouse
 */
function initCursor() {
  const cursorDefault = document.querySelector('.cursor-default');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursorDefault || !cursorFollower) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  let scale = 1;
  let opacity = 1;
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update default cursor position immediately
    cursorDefault.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });
  
  // Animate follower cursor with delay
  function animateFollower() {
    // Calculate new position with easing
    followerX += (mouseX - followerX) / 8;
    followerY += (mouseY - followerY) / 8;
    
    // Apply transformations
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(${scale})`;
    cursorFollower.style.opacity = opacity;
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
  
  // Cursor hover effects
  const hoverElements = [
    ...document.querySelectorAll('a'),
    ...document.querySelectorAll('button'),
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.portfolio-item'),
    ...document.querySelectorAll('.team-member')
  ];
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      scale = 2;
      opacity = 0.5;
      cursorDefault.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.5)`;
    });
    
    el.addEventListener('mouseleave', () => {
      scale = 1;
      opacity = 1;
      cursorDefault.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
    });
  });
}

/**
 * PARTICLE.JS BACKGROUND
 * Initializes the particle.js background animation
 */
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#7b0091"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.3,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#7b0091",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
}

/**
 * SMOOTH SCROLLING
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
      
      // Calculate target position
      const headerHeight = document.querySelector('.main-header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    });
  });
}

/**
 * SCROLL ANIMATIONS
 * Initializes AOS and custom scroll animations
 */
function initScrollAnimations() {
  // Initialize AOS library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100
    });
  }
  
  // Custom scroll animations for process items
  const processItems = document.querySelectorAll('.process-item');
  
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  
  processItems.forEach(item => {
    processObserver.observe(item);
  });
  
  // Header scroll effect
  const header = document.querySelector('.main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * MOBILE MENU
 * Handles the mobile navigation menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    
    // Toggle body scroll
    if (menu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * HERO SLIDESHOW
 * Animates the hero background slideshow
 */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Show first slide
  slides[currentSlide].classList.add('active');
  
  // Change slide every 5 seconds
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slideCount;
    
    slides[currentSlide].classList.add('active');
  }, 5000);
}

/**
 * ANIMATE HERO CONTENT
 * Animates the hero section content after preloader
 */
function animateHeroContent() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  
  if (heroTitle) {
    heroTitle.style.opacity = '1';
    const titleLines = heroTitle.querySelectorAll('.title-line span');
    titleLines.forEach((line, index) => {
      line.style.animationDelay = `${index * 0.2}s`;
    });
  }
  
  if (heroSubtitle) {
    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    }, 600);
  }
  
  if (heroCta) {
    setTimeout(() => {
      heroCta.style.opacity = '1';
      heroCta.style.transform = 'translateY(0)';
    }, 800);
  }
  
  if (scrollIndicator) {
    setTimeout(() => {
      scrollIndicator.style.opacity = '1';
    }, 1000);
  }
}

/**
 * CLIENTS MARQUEE
 * Animates the clients logo marquee
 */
function initClientsMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;
  
  // Duplicate the marquee items for seamless looping
  const marqueeItems = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML += marqueeItems;
  
  // Set animation duration based on width
  const marqueeWidth = marqueeTrack.scrollWidth / 2;
  const duration = marqueeWidth / 50; // pixels per second
  
  marqueeTrack.style.animationDuration = `${duration}s`;
}

/**
 * SERVICE CARDS
 * Adds hover animations to service cards
 */
function initServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
}

/**
 * PORTFOLIO FILTER
 * Handles filtering of portfolio items
 */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length === 0 || portfolioItems.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          // Trigger animation
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * TESTIMONIAL SLIDER
 * Creates a responsive testimonial slider
 */
function initTestimonialSlider() {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!sliderTrack || slides.length === 0) return;
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  // Update slider position
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Navigate to specific slide
  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    updateSlider();
  }
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto-advance slides
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  sliderTrack.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  sliderTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
  
  // Responsive adjustments
  function handleResize() {
    // Reset slider position on resize
    updateSlider();
  }
  
  window.addEventListener('resize', handleResize);
}

/**
 * COUNTERS
 * Animates number counters in stats section
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-count');
        const duration = 2000; // Animation duration in ms
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const counter = entry.target;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * CONTACT FORM
 * Handles form validation and submission
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const serviceSelect = document.getElementById('service');
  const messageInput = document.getElementById('message');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  // Form validation
  function validateForm() {
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      showSuccess(nameInput);
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }
    
    // Validate service
    if (serviceSelect.value === '') {
      showError(serviceSelect, 'Please select a service');
      isValid = false;
    } else {
      showSuccess(serviceSelect);
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Message is required');
      isValid = false;
    } else {
      showSuccess(messageInput);
    }
    
    return isValid;
  }
  
  // Show error message
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('small');
    
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorMessage);
    }
    
    formGroup.classList.add('error');
  }
  
  // Show success state
  function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
      errorMessage.remove();
    }
    
    formGroup.classList.remove('error');
  }
  
  // Email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
        </svg>
        Sending...
      `;
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Message Sent!
        `;
        
        // Reset form
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          
          // Reset form group states
          document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('active');
          });
        }, 2000);
      }, 1500);
    }
  });
  
  // Input validation on blur
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() !== '') {
      showSuccess(nameInput);
    }
  });
  
  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
      showSuccess(emailInput);
    }
  });
  
  serviceSelect.addEventListener('change', () => {
    if (serviceSelect.value !== '') {
      showSuccess(serviceSelect);
    }
  });
  
  messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() !== '') {
      showSuccess(messageInput);
    }
  });
}

/**
 * BACK TO TOP BUTTON
 * Shows/hides back to top button based on scroll position
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * CURRENT YEAR
 * Updates the current year in the footer
 */
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * HELPER FUNCTIONS
 * Utility functions used throughout the application
 */

// Debounce function for performance optimization
function debounce(func, wait = 20, immediate = false) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
