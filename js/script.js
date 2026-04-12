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
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
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

// Contact form handler - SAFE DOMContentLoaded + popup + EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form') || document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit triggered!');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject') ? document.getElementById('subject').value : 'Contact';
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('⚠️ Remplissez nom, email, message.');
                return;
            }
            
            // POPUP CONFIRM - ALWAYS WORKS
            const popup = confirm(`✅ Confirmer envoi ?\n\n👤 ${name}\n📧 ${email}\n📋 ${subject}`);
            
            if (popup) {
                // EmailJS IF AVAILABLE (GH Pages OK, local maybe not)
                if (typeof emailjs !== 'undefined') {
                    emailjs.init("DMj2Qzxb6fXLx-nSo");
                    
                    emailjs.send("service_kseoq7c", "template_ax5haed", {
                        name: name,
                        time: new Date().toLocaleString(),
                        email: email,
                        message: message
                    }).then((response) => {
                        console.log('✅ SUCCESS!', response);
                        this.reset();
                        alert('📧 ENVOYÉ ! Boite mail.');
                    }).catch((error) => {
                        console.log('❌ EMAILJS ERROR:', error);
                        alert('✅ Popup OK ! EmailJS local fail (CORS) - test GH Pages.');
                    });
                } else {
                    console.log('EmailJS not loaded - demo mode');
                    this.reset();
                    alert('✅ Popup OK ! Test GH Pages pour EmailJS réel.');
                }
            }
        });
    } else {
        console.log('No contact form found on this page');
    }
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

// Animate on scroll
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

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress__fill');
            fills.forEach(fill => {
                fill.style.width = fill.dataset.progress + '%';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill').forEach(skill => {
    progressObserver.observe(skill);
});

// Projects filter
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                document.querySelectorAll('.project__card').forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
