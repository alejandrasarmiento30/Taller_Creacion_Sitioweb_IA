/**
 * FocusCampus - Control de Interacciones y Validación DOM
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegación Móvil Accesible
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al presionar un enlace de anclaje
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Validación y Control del Formulario
    const leadForm = document.getElementById('leadForm');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const careerSelect = document.getElementById('career');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    if (!leadForm) return;

    // Limpiar estados de error al interactuar con los campos
    [nameInput, emailInput, careerSelect].forEach(element => {
        if (!element) return;
        const eventType = element.tagName === 'SELECT' ? 'change' : 'input';

        element.addEventListener(eventType, () => {
            element.classList.remove('input-error');
            const errorContainer = document.getElementById(`${element.id.replace('user', '').toLowerCase()}Error`) 
                                 || document.getElementById(`${element.id}Error`);
            if (errorContainer) errorContainer.textContent = '';
        });
    });

    const setFieldError = (element, message, errorId) => {
        if (element) element.classList.add('input-error');
        const container = document.getElementById(errorId);
        if (container) container.textContent = message;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let hasErrors = false;

        // Limpiar mensajes generales previos
        formFeedback.className = 'form-feedback hidden';
        formFeedback.textContent = '';

        // Validación de Nombre
        if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
            setFieldError(nameInput, 'Por favor, ingresa tu nombre completo (mínimo 3 letras).', 'nameError');
            hasErrors = true;
        }

        // Validación de Correo
        if (!isValidEmail(emailInput.value.trim())) {
            setFieldError(emailInput, 'Ingresa un correo electrónico con formato válido.', 'emailError');
            hasErrors = true;
        }

        // Validación de Categoría / Carrera
        if (!careerSelect.value) {
            setFieldError(careerSelect, 'Selecciona una categoría de estudio.', 'careerError');
            hasErrors = true;
        }

        // Detener ejecución si existen inconsistencias
        if (hasErrors) return;

        // Estado visual de envío accesible
        submitBtn.disabled = true;
        submitBtn.textContent = 'Procesando...';

        // Simulación de respuesta inmediata en cliente
        setTimeout(() => {
            leadForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Completar Registro';

            formFeedback.textContent = '¡Registro completado con éxito! Te contactaremos pronto.';
            formFeedback.className = 'form-feedback success';

            setTimeout(() => {
                formFeedback.className = 'form-feedback hidden';
                formFeedback.textContent = '';
            }, 6000);
        }, 600);
    });
});