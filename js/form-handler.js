// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('seo-form');
    if (!contactForm) return;

    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const website = document.getElementById('website').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Name validation
        if (name === '') {
            showError('name', 'Por favor, insira seu nome completo');
            isValid = false;
        } else {
            clearError('name');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Por favor, insira seu e-mail');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Por favor, insira um e-mail válido');
            isValid = false;
        } else {
            clearError('email');
        }
        
        // Phone validation (optional)
        if (phone !== '') {
            const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
            if (!phoneRegex.test(phone)) {
                showError('phone', 'Por favor, insira um telefone válido');
                isValid = false;
            } else {
                // Format phone number
                const digits = phone.replace(/\D/g, '');
                const formattedPhone = `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
                document.getElementById('phone').value = formattedPhone;
                clearError('phone');
            }
        }
        
        if (isValid) {
            // Simulate form submission (replace with actual AJAX call)
            simulateFormSubmission();
        }
    });
    
    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        formGroup.classList.add('error');
        
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        errorMessage.style.color = '#ff4d4d';
    }
    
    // Clear error message
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = '';
        }
    }
    
    // Simulate form submission
    function simulateFormSubmission() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Entraremos em contato em breve para discutir sua estratégia de SEO.</p>
        `;
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '20px';
        successMessage.style.backgroundColor = 'rgba(3, 252, 102, 0.1)';
        successMessage.style.borderRadius = '8px';
        successMessage.style.marginTop = '20px';
        successMessage.style.color = 'var(--secondary)';
        
        const existingMessage = contactForm.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        contactForm.appendChild(successMessage);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    }
    
    // Phone number masking
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = '(' + value.substring(0, 2);
            }
            if (value.length > 2) {
                formattedValue += ') ' + value.substring(2, 7);
            }
            if (value.length > 7) {
                formattedValue += '-' + value.substring(7, 11);
            }
            
            this.value = formattedValue;
        });
    }
});

// WhatsApp integration
function initWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = '5511999999999'; // Replace with your WhatsApp number
            const message = 'Olá, gostaria de saber mais sobre os serviços de SEO da PositiOn!';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Initialize WhatsApp integration
initWhatsAppIntegration();