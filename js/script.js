// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar y aplicar el modo oscuro al cargar la página
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️ Modo Claro';
        }
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Menú hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Validación de formulario
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }

    // ScrollReveal
    initScrollReveal();
});

// Función para alternar el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Cambia el texto del botón
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
}

// Función para el menú hamburguesa
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.classList.toggle('active');
}

// Validación del formulario en tiempo real
function validateForm(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    let isValid = true;

    // Validación del nombre
    if (nombre.value.trim().length < 3) {
        showError(nombre, 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
    } else {
        removeError(nombre);
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Ingrese un email válido');
        isValid = false;
    } else {
        removeError(email);
    }

    // Validación del mensaje
    if (mensaje.value.trim().length < 10) {
        showError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    } else {
        removeError(mensaje);
    }

    // Si todo es válido, muestra mensaje de éxito
    if (isValid) {
        showSuccessMessage();
        document.querySelector('.contact-form').reset();
    }
}

// Función para mostrar errores
function showError(input, message) {
    const formControl = input.parentElement;
    let errorDiv = formControl.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formControl.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('error');
}

// Función para remover errores
function removeError(input) {
    const formControl = input.parentElement;
    const errorDiv = formControl.querySelector('.error-message');
    if (errorDiv) {
        formControl.removeChild(errorDiv);
    }
    input.classList.remove('error');
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <h3>¡Mensaje Enviado!</h3>
            <p>Gracias por contactarnos. Te responderemos pronto.</p>
            <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(successModal);
    
    // Eliminar modal después de 5 segundos
    setTimeout(() => {
        if (successModal.parentElement) {
            successModal.remove();
        }
    }, 5000);
}

// Inicialización de ScrollReveal
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transition = "opacity 0.5s ease-in-out";
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                    }, index * 200);
                }
            });
        });
        
        observer.observe(section);
    });
}