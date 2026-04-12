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

// Contact form handler index - popup confirm + EmailJS ready
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Popup confirmation
    const popup = confirm(`✅ Confirmer envoi ?\n\n👤 Nom: ${name}\n📧 Email: ${email}\n📋 Sujet: ${subject}`);
    
    if (popup) {
        // Reset form
        this.reset();
        
        // Demo console + alert
        console.log('Message confirmé:', {name, email, subject, message});
        alert('📧 Message reçu ! Réponse sous 24h.');
    }
    
    // TODO EmailJS réel gratuit (no server):
    // 1. EmailJS.com compte
    // 2. Ajoutez <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    // 3. emailjs.init("YOUR_PUBLIC_KEY");
    // 4. emailjs.send("service_id","template_id",params)
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

// Progress bars animation
const progressBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress__fill');
            fills.forEach(fill => {
                const width = fill.dataset.progress;
                fill.style.width = width;
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill').forEach(skill => {
    progressBarsObserver.observe(skill);
});
