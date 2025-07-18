// Traffic Squad Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.borderBottom = '1px solid rgba(255, 69, 0, 0.2)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll reveal to elements
    const revealElements = document.querySelectorAll('.service-card, .philosophy-content, .team-gallery, .join');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const parallaxFactor = 0.5;

        if (scrolled < heroHeight) {
            heroVisual.style.transform = `translateY(${scrolled * parallaxFactor}px)`;
        }
    });

    // Animate gradient shape
    const gradientShape = document.querySelector('.gradient-shape');
    let animationId;

    function animateGradient() {
        const time = Date.now() * 0.001;
        const hue1 = (time * 30) % 360;
        const hue2 = (time * 30 + 60) % 360;
        const hue3 = (time * 30 + 120) % 360;
        const hue4 = (time * 30 + 180) % 360;

        if (gradientShape) {
            gradientShape.style.background = `linear-gradient(135deg, 
                hsl(${hue1}, 100%, 60%), 
                hsl(${hue2}, 100%, 55%), 
                hsl(${hue3}, 100%, 50%), 
                hsl(${hue4}, 100%, 65%))`;
        }

        animationId = requestAnimationFrame(animateGradient);
    }

    // Start gradient animation only if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animateGradient();
    }

    // Gallery interaction
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.zIndex = '1';
        });
    });

    // Gallery more button functionality
    const galleryMore = document.querySelector('.gallery-more');
    if (galleryMore) {
        galleryMore.addEventListener('click', function() {
            // Simulate loading more photos
            this.innerHTML = '<span>Loading...</span>';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<span>More photos coming soon!</span>';
                this.style.background = 'rgba(255, 69, 0, 0.1)';
                this.style.borderColor = 'rgba(255, 69, 0, 0.3)';
            }, 1500);
        });
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects with ripple
    const buttons = document.querySelectorAll('.hero-cta, .join-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Text typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const lines = heroTitle.querySelectorAll('.hero-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Performance optimization: pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            document.body.style.animationPlayState = 'paused';
        } else {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                animateGradient();
            }
            document.body.style.animationPlayState = 'running';
        }
    });

    // Lazy loading for better performance
    const lazyElements = document.querySelectorAll('.gallery-image, .image-placeholder');
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // Form validation (if forms are added later)
    function validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    // Add CSS for ripple effect
    const rippleCSS = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .error {
            border-color: #ff4444 !important;
            box-shadow: 0 0 5px rgba(255, 68, 68, 0.3) !important;
        }
    `;

    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);

    // Initialize animations after page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial scroll reveal check
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Scroll-dependent functionality
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update any scroll-dependent elements here
    document.documentElement.style.setProperty('--scroll', scrollTop);
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

function setLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    window.setLanguage = function(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    };
});

const translations = {
    en: {
      "nav.career": "Career",
      "nav.language": "EN",
      "hero.description": "We are here to exceed expectations...",
      "hero.cta": "JOIN US",
      "whatWeDo.title": "WHAT DO WE DO HERE?",
      "whatWeDo.description1": "We are a Ukrainian igaming media buying company...",
      "whatWeDo.description2": "We are trusted by the biggest players...",
      "philosophy.title": "FIRST HUMAN, THEN BUSINESS",
      "philosophy.description1": "Instead of operating on a Business to Business approach, we choose Human to Human.",
      "philosophy.description2": "We know that our business is not a short-term game, and the biggest bet we can make in it is human relations.",
      "philosophy.description3": "Be it a team, partners or a country, our position remains unchanged - first human, then business.",
      "team.title": "Dream Team",
      "team.description1": "In two years of existence, we have formed the best team!",
      "team.description2": "We enjoy knowing that everyone makes a significant and unique contribution to the company. And the company is happy to invest in the team!",
      "team.description3": "We believe in our people. As such, we are very happy to give each team member the opportunity to advance. Our employees grow from a developer to a department head, from a media buyer to a team leader.",
      "team.description4": "We are proud of each person on our team!",
      "join.title": "JOIN THE TEAM",
      "join.description": "We welcome talented individuals who share our values and want to be part of our growing team.",
      "join.cta": "Apply Now",
      "join.link": "View Open Positions",
      "nav.career": "Career",
      "team.description3": "We believe in our people. As such, we are very happy to give each team member the opportunity to advance. Our employees grow from a developer to a department head, from a media buyer to a team leader.",
      "team.description4": "We are proud of each person on our team!"
    },
    ua: {
      "nav.career": "Кар'єра",
      "nav.language": "UA",
      "hero.description": "Ми тут, щоб перевершити очікування...",
      "hero.cta": "ПРИЄДНУЙСЯ",
      "whatWeDo.title": "ЩО МИ РОБИМО?",
      "whatWeDo.description1": "Ми українська медіабаїнгова компанія...",
      "whatWeDo.description2": "Нам довіряють найбільші гравці...",
      "philosophy.title": "СПОЧАТКУ ЛЮДИНА, ПОТІМ БІЗНЕС",
      "philosophy.description1": "Замість підходу Бізнес для Бізнесу, ми обираємо Людина для Людини.",
      "philosophy.description2": "Ми знаємо, що наш бізнес – це не короткострокова гра, і найбільша ставка, яку ми можемо зробити, – це людські відносини.",
      "philosophy.description3": "Будь то команда, партнери чи країна, наша позиція залишається незмінною – спочатку людина, потім бізнес.",
      "team.title": "Команда Мрії",
      "team.description1": "За два роки існування ми сформували найкращу команду!",
      "team.description2": "Нам приємно усвідомлювати, що кожен робить значний та унікальний внесок у компанію. І компанія із задоволенням інвестує в команду!",
      "join.title": "ПРИЄДНУЙСЯ ДО КОМАНДИ",
  "join.description": "Ми раді вітати талановитих людей, які поділяють наші цінності та хочуть бути частиною нашої зростаючої команди.",
  "join.cta": "Подати заявку",
  "join.link": "Переглянути вакансії",
  "nav.career": "Кар'єра",
  "team.description3": "Ми віримо в наших людей. Таким чином, ми дуже раді надати кожній командному члену можливість просування. Наші працівники ростуть від розробника до керівника відділу, від медіабаїнгу до лідера команди.",
  "team.description4": "Ми пишаємося кожним членом нашої команди!"
    }
  };
  const langBtn = document.querySelector('.language-selector');
const mobileLangBtn = document.querySelector('.mobile-language');
let currentLang = 'en';

function updateLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  langBtn.querySelector('.language').textContent = lang.toUpperCase();
  mobileLangBtn.textContent = lang.toUpperCase();
  currentLang = lang;
}

langBtn.addEventListener('click', () => {
  const newLang = currentLang === 'en' ? 'ua' : 'en';
  updateLanguage(newLang);
});

mobileLangBtn.addEventListener('click', () => {
  const newLang = currentLang === 'en' ? 'ua' : 'en';
  updateLanguage(newLang);
});

// Инициализация
updateLanguage(currentLang);