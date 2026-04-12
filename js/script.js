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

// Modal functions INTEGRATED - NO EXTERNAL DEPENDENCY
function showConfirmModal(name, email, subject, message, form) {
    // Clean existing
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal">
            <span class="modal__close" onclick="closeModal()">&times;</span>
            <div class="modal__header">
                <div class="modal__icon">📨</div>
                <h2 class="modal__title">Confirmer votre message</h2>
            </div>
            <div class="modal__summary">
                <div class="summary-row">
                    <span class="summary-label">👤 Nom</span>
                    <span class="summary-value">${escapeHtml(name)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">📧 Email</span>
                    <span class="summary-value">${escapeHtml(email)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">📋 Sujet</span>
                    <span class="summary-value">${escapeHtml(subject || 'Non spécifié')}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">💬 Message</span>
                    <span class="summary-value">${escapeHtml(message)}</span>
                </div>
            </div>
            <div class="modal__buttons">
                <button class="modal__btn modal__btn--confirm" onclick="confirmAndSend('${btoa(JSON.stringify({name, email, subject, message, formId: form.id}))}')">Envoyer</button>
                <button class="modal__btn modal__btn--cancel" onclick="closeModal()">Annuler</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));
}

window.confirmAndSend = function(encodedData) {
    const data = JSON.parse(atob(encodedData));
    const name = data.name;
    const email = data.email;
    const subject = data.subject;
    const message = data.message;
    const formId = data.formId;
    const form = document.getElementById(formId);
    
    // EmailJS PRO
    if (typeof emailjs !== 'undefined') {
        emailjs.init("DMj2Qzxb6fXLx-nSo");
        emailjs.send("service_kseoq7c", "template_ax5haed", {
            from_name: name,
            time: new Date().toLocaleString('fr-FR'),
            email: email,
            title: subject,
            message: message
        }).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
form.reset();
            showSuccessPopup();
        }, function(error) {
            console.log('FAILED...', error);

        });
    } else {
        // Local demo
        console.log('Demo - Form data:', {name, email, subject, message});
        form.reset();
        alert('✅ Prévisualisé parfait ! Sur GitHub Pages = Email réel envoyé.');
    }
    
    closeModal();
};

window.closeModal = function() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
};

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form') || document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit triggered!');
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject')?.value.trim() || 'Contact portfolio';
            const message = document.getElementById('message').value.trim();
            
            console.log('Form data:', {name, email, subject, message}); // DEBUG
            
            if (!name || !email || !message) {
                alert('⚠️ Veuillez remplir nom, email et message.');
                return;
            }
            
            // Show modal with ALL fields
            showConfirmModal(name, email, subject, message, this);
        });
    } else {
        console.log('No contact form on this page');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header && window.scrollY > 100) {
        header.style.background = 'rgba(15, 15, 20, 0.98)';
    } else if (header) {
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

// Progress bars 100%
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

// Projects filter (if exists)
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

// Overlay click close
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});
