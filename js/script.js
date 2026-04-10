// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-btn');
const navLinks = document.getElementById('nav');
const nav = document.querySelector('.nav__links');

mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileBtn.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileBtn.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling (demo - console log)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log('Message envoyé:', Object.fromEntries(formData));
    alert('Message envoyé ! (Demo - vérifiez la console)');
    this.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 20, 0.98)';
    } else {
        header.style.background = 'rgba(15, 15, 20, 0.95)';
    }
});

// Animate on scroll (simple intersection observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});
