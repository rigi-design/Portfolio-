// Modal Confirmation - Clean Version
function showConfirmModal(name, email, subject, message, form) {
    // Clean existing modals
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    overlay.innerHTML = `
        <div class="modal">
            <span class="modal__close" onclick="closeModal()">×</span>
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
                <div class="summary-row">
                    <span class="summary-label">📝 Message:</span>
                    <span class="summary-value">${escapeHtml(message)}</span>
                </div>
            </div>
            <div class="modal__buttons">
                <button class="modal__btn modal__btn--confirm" onclick="sendEmail('${btoa(JSON.stringify({name, email, subject, message, formId: form.id}))}')">
                    ✅ Envoyer
                </button>
                <button class="modal__btn modal__btn--cancel" onclick="closeModal()">
                    ❌ Annuler
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));
}

window.sendEmail = function(encodedData) {
    const data = JSON.parse(atob(encodedData));
    const form = document.getElementById(data.formId);
    
    // Demo / EmailJS
    console.log('Envoi:', data);
    form.reset();
    alert('✅ Message envoyé ! (Demo local - EmailJS live sur GitHub Pages)');
    closeModal();
};

window.closeModal = function() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
};

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

