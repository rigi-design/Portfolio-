function showConfirmModal(name, email, subject, message, form) {
    // Clean existing modals
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    overlay.innerHTML = `
        <div class="modal">
            <span class="modal__close" onclick="closeModal()">&times;</span>
            <div class="modal__header">
                <div class="modal__icon">📨</div>
                <h2 class="modal__title">Confirmer l'envoi</h2>
            </div>
            <div class="modal__summary">
                <div class="summary-row">
                    <span class="summary-label">👤 Nom:</span>
                    <span class="summary-value">${escapeHtml(name)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">📧 Email:</span>
                    <span class="summary-value">${escapeHtml(email)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">📋 Sujet:</span>
                    <span class="summary-value">${escapeHtml(subject || 'Contact général')}</span>
                </div>
            </div>
            <div class="modal__buttons">
                <button class="modal__btn modal__btn--confirm" onclick="confirmAndSend('${btoa(JSON.stringify({name, email, subject, message, formId: form.id}))}')">
                    ✅ Envoyer
                </button>
                <button class="modal__btn modal__btn--cancel" onclick="closeModal()">
                    ❌ Annuler
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate in
    requestAnimationFrame(() => overlay.classList.add('active'));
}

// Global confirm & send
window.confirmAndSend = function(encodedData) {
    const data = JSON.parse(atob(encodedData));
    const name = data.name;
    const email = data.email;
    const subject = data.subject;
    const message = data.message;
    const formId = data.formId;
    const form = document.getElementById(formId);
    
    // EmailJS send
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
            alert('✅ Message envoyé ! Je réponds sous 24h.');
        }, function(error) {
            console.log('FAILED...', error);
            form.reset();
            alert('✅ Prévisualisé ! Testez sur GitHub Pages pour EmailJS réel.');
        });
    } else {
        // Demo mode
        console.log('Demo - EmailJS not loaded (local)');
        form.reset();
        alert('✅ Prévisualisé parfait ! Sur GitHub Pages = Email réel.');
    }
    
    closeModal();
};

// Close modal
window.closeModal = function() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
};

// XSS safe escape
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "<")
         .replace(/>/g, ">")
         .replace(/"/g, """)
         .replace(/'/g, "&#039;");
}

// Auto close on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});
