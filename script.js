// Tailwind Configuration
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                kusa: {
                    navy: '#0f172a',    /* Slate 900 (Original Dark Professional) */
                    blue: '#1e40af',    /* Blue 700 (Original Vibrant Deep Blue) */
                    lime: '#a3e635',    /* Lime 400 */
                    darklime: '#4d7c0f',
                    light: '#f8fafc',
                    gray: '#334155'
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            boxShadow: {
                'neon': '0 0 5px theme("colors.kusa.lime"), 0 0 20px theme("colors.kusa.lime")',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            animation: {
                'scroll': 'scroll 30s linear infinite',
                'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}

// Navbar Scroll Effect
// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('main-navbar');
    // Safety check: ensure navbar exists before manipulating it
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-md', 'py-2');
            navbar.classList.remove('bg-transparent', 'py-4');
            // Select ONLY specific nav-links, excluding buttons
            navbar.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-white', 'hover:text-kusa-lime');
                link.classList.add('text-gray-700', 'hover:text-kusa-blue');
            });
        } else {
            navbar.classList.add('bg-transparent', 'py-4');
            navbar.classList.remove('bg-white', 'shadow-md', 'py-2');
            navbar.querySelectorAll('.nav-link').forEach(link => {
                link.classList.add('text-white', 'hover:text-kusa-lime');
                link.classList.remove('text-gray-700', 'hover:text-kusa-blue');
            });
        }
    }
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.classList.remove("hidden");
            scrollTopBtn.classList.add("flex");
        } else {
            scrollTopBtn.classList.add("hidden");
            scrollTopBtn.classList.remove("flex");
        }
    }

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Dark Mode Logic Removed by User Request



// Counter Animation Logic
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, ''); // Remove non-digits if any
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Use Intersection Observer for Counters
const impactSection = document.querySelector('.counter')?.closest('section');
if (impactSection) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    counterObserver.observe(impactSection);
}

// (Conflicting Navbar Logic Removed)
// The single source of truth for Navbar Scroll is now Lines 49-66.


// Scroll Reveal Animation (Generic)
const revealElements = document.querySelectorAll('section > div, .group, .break-inside-avoid');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = "1"; // Ensure it stays visible
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = "0"; // Initially hide
    revealObserver.observe(el);
});


// Lightbox Gallery Logic
const galleryImages = document.querySelectorAll('#galeria img');
const body = document.body;

// Create Lightbox DOM
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.className = 'fixed inset-0 z-[100] hidden bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 opacity-0';
lightbox.innerHTML = `
    <div class="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center bg-transparent">
        <button id="lightbox-close" class="absolute -top-12 right-0 text-white hover:text-kusa-lime transition-colors text-4xl leading-none">&times;</button>
        <img id="lightbox-img" src="" alt="Lightbox Image" class="max-w-full max-h-[85vh] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] object-contain transform scale-95 transition-transform duration-300">
        <div id="lightbox-caption" class="absolute bottom-4 left-0 w-full text-center text-white/90 font-light bg-black/50 p-2 rounded-b-lg backdrop-blur-md"></div>
    </div>
`;
body.appendChild(lightbox);

const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxCaption = document.getElementById('lightbox-caption');

// Open Lightbox
galleryImages.forEach(img => {
    img.addEventListener('click', e => {
        e.stopPropagation(); // Prevent bubbling
        const src = img.src;
        const alt = img.alt || 'Imagen de Galería';

        lightboxImg.src = src;
        lightboxCaption.textContent = alt;

        lightbox.classList.remove('hidden');
        // Small delay to allow display flex to apply before opacity transition
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightboxImg.classList.remove('scale-95');
            lightboxImg.classList.add('scale-100');
        }, 10);

        body.classList.add('overflow-hidden'); // Disable background scroll
    });
});

// Close Lightbox Functions
const closeLightbox = () => {
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');

    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = ''; // Clear source
        body.classList.remove('overflow-hidden');
    }, 300); // Match transition duration
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.max-w-5xl') === null) {
        closeLightbox();
    }
});

// Esc Key to Close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
    }
});

// ============================================
// COMPREHENSIVE ANIMATION SYSTEM
// ============================================

// 1. SCROLL PROGRESS BAR
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 2. ENHANCED SCROLL REVEAL with Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// 3. TILT EFFECT FOR CARDS
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });
}

// 4. MAGNETIC BUTTONS
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;

            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                btn.style.setProperty('--magnetic-x', `${x * strength * 0.3}px`);
                btn.style.setProperty('--magnetic-y', `${y * strength * 0.3}px`);
            }
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--magnetic-x', '0px');
            btn.style.setProperty('--magnetic-y', '0px');
        });
    });
}

// 5. CUSTOM CURSOR (Desktop only)
function initCustomCursor() {
    if (window.innerWidth < 768) return; // Skip on mobile

    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Scale on hover
    const hoverElements = document.querySelectorAll('a, button, .cursor-hover');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// 6. PAUSE CAROUSEL ON HOVER
function enhanceCarousel() {
    const carouselContainer = document.querySelector('.animate-scroll');
    if (!carouselContainer) return;

    carouselContainer.addEventListener('mouseenter', () => {
        carouselContainer.style.animationPlayState = 'paused';
    });

    carouselContainer.addEventListener('mouseleave', () => {
        carouselContainer.style.animationPlayState = 'running';
    });
}

// 7. SMOOTH SCROLL TO TOP
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollBtn.classList.add('opacity-100');
        } else {
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollBtn.classList.remove('opacity-100');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. ACTIVE SECTION INDICATOR
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-section');
                    if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `index.html#${id}`) {
                        link.classList.add('active-section');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}

// 9. PARALLAX EFFECT
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-slow');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 10. LAZY LOADING ENHANCEMENT
function enhanceLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    initScrollProgress();
    initScrollReveal();

    // Interactive effects
    initTiltEffect();
    initMagneticButtons();
    // initCustomCursor(); // Disabled per user request

    // Enhanced features
    enhanceCarousel();
    initScrollToTop();
    initActiveSection();
    initParallax();
    enhanceLazyLoading();

    console.log('🎨 KUSA Visual Enhancement System Loaded');
});

