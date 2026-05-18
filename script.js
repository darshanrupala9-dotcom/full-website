// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.fill');

const animateSkills = () => {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.width = bar.parentElement
        .previousElementSibling
        .lastElementChild.textContent;
    }
  });
};

window.addEventListener('scroll', animateSkills);

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
let counted = false;

const startCounter = () => {
  if (counted) return;

  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      counted = true;
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + '+';
        }
      };

      update();
    }
  });
};

window.addEventListener('scroll', startCounter);

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || 
          item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const formMessage = document.getElementById('formMessage');

  // Simple validation
  if (!name || !email || !subject || !message) {
    formMessage.textContent = '❌ Please fill in all fields!';
    formMessage.className = 'error';
    return;
  }

  // Simulate sending (replace with real API call)
  const btn = contactForm.querySelector('button');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    formMessage.textContent = 
      '✅ Message sent successfully! I will get back to you soon.';
    formMessage.className = 'success';
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  }, 2000);
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-item, .testimonial-card'
);

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== NEWSLETTER =====
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');

newsletterBtn.addEventListener('click', () => {
  if (newsletterInput.value.includes('@')) {
    alert('✅ Thank you for subscribing!');
    newsletterInput.value = '';
  } else {
    alert('❌ Please enter a valid email!');
  }
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.hero-content h2');
const texts = [
  'Full Stack Web Developer',
  'UI/UX Designer',
  'Problem Solver',
  'Freelancer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeText = () => {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeText, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeText, isDeleting ? 50 : 100);
};

// Start typing animation
typeText();