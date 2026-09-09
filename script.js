

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initBackToTop();
  setFooterYear();
  initAppointmentForm();
});

/* ---------- Menú de navegación móvil ---------- */

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (event) => {
    const clickedInsideNav = nav.contains(event.target) || toggle.contains(event.target);
    if (!clickedInsideNav && nav.classList.contains('is-open')) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });
}

/* ---------- Botón "volver arriba" ---------- */

function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;

  const toggleVisibility = () => {
    button.style.display = window.scrollY > 400 ? 'flex' : 'none';
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Año dinámico en el footer ---------- */

function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Validación del formulario de solicitud de hora ---------- */

const VALID_SPECIES = ['perro', 'gato', 'conejo', 'ave'];

const FIELD_RULES = {
  ownerName: {
    validate: (value) => value.trim().length >= 3 && /^[a-záéíóúñü\s]+$/i.test(value.trim()),
    message: 'Ingresa tu nombre completo (mínimo 3 letras, sin números).',
  },
  ownerEmail: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: 'Ingresa un correo electrónico válido, por ejemplo nombre@ejemplo.com.',
  },
  ownerPhone: {
    validate: (value) => /^[0-9+\s-]{8,15}$/.test(value.trim()),
    message: 'Ingresa un teléfono válido (solo números, espacios o guiones, mínimo 8 dígitos).',
  },
  petSpecies: {
    validate: (value) => VALID_SPECIES.includes(value.trim().toLowerCase()),
    message: 'Escribe una especie válida: Perro, Gato, Conejo o Ave.',
  },
  preferredDate: {
    validate: (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(value);
      return selected >= today;
    },
    message: 'Elige una fecha igual o posterior a hoy.',
  },
  reason: {
    validate: (value) => value.trim().length >= 10,
    message: 'Cuéntanos el motivo de la consulta (mínimo 10 caracteres).',
  },
};

function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');

  Object.keys(FIELD_RULES).forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    ensureErrorElement(field, fieldId);

    field.addEventListener('blur', () => validateField(fieldId));
    field.addEventListener('input', () => {
      const wrapper = field.closest('.form-field');
      if (wrapper && wrapper.classList.contains('has-error')) {
        validateField(fieldId);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isFormValid = Object.keys(FIELD_RULES)
      .map((fieldId) => validateField(fieldId))
      .every(Boolean);

    if (!isFormValid) {
      if (statusEl) {
        statusEl.textContent = 'Revisa los campos marcados en rojo antes de enviar la solicitud.';
        statusEl.classList.remove('form-status--success');
        statusEl.classList.add('form-status--error');
      }
      const firstInvalid = form.querySelector('.form-field.has-error input, .form-field.has-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (statusEl) {
      statusEl.textContent = '¡Solicitud enviada! Nuestro equipo se contactará contigo para confirmar tu hora.';
      statusEl.classList.remove('form-status--error');
      statusEl.classList.add('form-status--success');
    }
    form.reset();
  });
}

function ensureErrorElement(field, fieldId) {
  const wrapper = field.closest('.form-field');
  if (!wrapper) return;

  let errorEl = wrapper.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error';
    errorEl.id = `${fieldId}Error`;
    errorEl.setAttribute('role', 'alert');
    wrapper.appendChild(errorEl);
  }
  field.setAttribute('aria-describedby', errorEl.id);
}

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const rule = FIELD_RULES[fieldId];
  if (!field || !rule) return true;

  const wrapper = field.closest('.form-field');
  const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
  const isValid = rule.validate(field.value);

  if (wrapper) wrapper.classList.toggle('has-error', !isValid);
  field.setAttribute('aria-invalid', String(!isValid));
  if (errorEl) errorEl.textContent = isValid ? '' : rule.message;

  return isValid;
}