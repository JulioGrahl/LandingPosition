// Smooth scroll animation
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - 100; // Offset for header
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Parallax effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.3;
            const offset = scrollPosition * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = 'var(--secondary)';
    progressBar.style.zIndex = '9999';
    progressBar.style.width = '0';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const progress = (scrollTop / (docHeight - windowHeight)) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Sticky elements
function initStickyElements() {
    const stickyElements = document.querySelectorAll('.sticky');
    
    stickyElements.forEach(element => {
        const offset = parseFloat(element.getAttribute('data-sticky-offset')) || 0;
        const originalPosition = element.offsetTop;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > originalPosition - offset) {
                element.classList.add('is-sticky');
            } else {
                element.classList.remove('is-sticky');
            }
        });
    });
}

// Initialize all scroll effects
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initScrollProgress();
    initStickyElements();
    
    // Add smooth scroll behavior to the whole document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Temporarily disable smooth scroll when using anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            document.documentElement.style.scrollBehavior = 'auto';
            setTimeout(() => {
                document.documentElement.style.scrollBehavior = 'smooth';
            }, 1000);
        });
    });
});

// Dynamic background for hero section based on scroll
function initDynamicHeroBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const opacity = 1 - Math.min(scrollPosition / 500, 0.8);
        heroSection.style.opacity = opacity;
        
        // Parallax effect for hero content
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Initialize dynamic hero background
initDynamicHeroBackground();