// Success Popup - Glassmorphism UI identique modal
function showSuccessPopup() {
    // Clean
    document.querySelectorAll('.success-popup').forEach(el => el.remove());
    
    const popup = document.createElement('div');
    popup.className = 'success-popup modal-overlay';
    popup.innerHTML = `
        <div class="modal">
            <div class="modal__header">
                <div class="modal__icon">✅</div>
                <h2 class="modal__title">Message Prévisualisé OK !</h2>
            </div>
            <div class="modal__summary">
                <div class="summary-row">
                    <span class="summary-label">📤 Statut</span>
<span class="summary-value">rigi-design.github.io indique prévisualisé OK !</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">📱 Local</span>
<span class="summary-value">Local OK</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">🌐 Live GitHub</span>
<span class="summary-value">EmailJS LIVE GitHub Pages</span>
                </div>
            </div>
            <div class="modal__buttons">
                <button class="modal__btn modal__btn--confirm" onclick="closeSuccessPopup()">
                    Fermer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('active'));
    
    // Auto close 3s
    setTimeout(closeSuccessPopup, 3500);
}

window.closeSuccessPopup = function() {
    const popup = document.querySelector('.success-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    }
};

