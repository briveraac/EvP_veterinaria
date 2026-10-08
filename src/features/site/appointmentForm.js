const FIELD_IDS = ['ownerName', 'ownerEmail', 'ownerPhone', 'petSpecies', 'preferredDate', 'reason'];

// Devolvemos un mensaje si el dato no cumple la regla de su campo.
function getFieldError(fieldId, value) {
  const text = value.trim();

  if (fieldId === 'ownerName') {
    if (text.length < 3 || !/^[a-záéíóúñü\s]+$/i.test(text)) {
      return 'Ingresa tu nombre completo (mínimo 3 letras, sin números).';
    }
  } else if (fieldId === 'ownerEmail') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      return 'Ingresa un correo electrónico válido, por ejemplo nombre@ejemplo.com.';
    }
  } else if (fieldId === 'ownerPhone') {
    if (!/^[0-9+\s-]{8,15}$/.test(text)) {
      return 'Ingresa un teléfono válido (solo números, espacios o guiones, mínimo 8 dígitos).';
    }
  } else if (fieldId === 'petSpecies') {
    const species = ['perro', 'gato', 'conejo', 'ave'];
    if (!species.includes(text.toLowerCase())) {
      return 'Escribe una especie válida: Perro, Gato, Conejo o Ave.';
    }
  } else if (fieldId === 'preferredDate') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(value + 'T00:00:00');
    if (!value || !(selected >= today)) {
      return 'Elige una fecha igual o posterior a hoy.';
    }
  } else if (fieldId === 'reason') {
    if (text.length < 10) {
      return 'Cuéntanos el motivo de la consulta (mínimo 10 caracteres).';
    }
  }

  return '';
}

export function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) {
    return () => {};
  }
  const statusEl = document.getElementById('formStatus');
  const cleanupCallbacks = [];
  FIELD_IDS.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (!field) {
      return;
    }
    ensureErrorElement(field, fieldId);
    const onBlur = () => validateField(fieldId);
    const onInput = () => {
      const wrapper = field.closest('.form-field');
      if (wrapper && wrapper.classList.contains('has-error')) {
        validateField(fieldId);
      }
    };
    field.addEventListener('blur', onBlur);
    field.addEventListener('input', onInput);
    cleanupCallbacks.push(() => {
      field.removeEventListener('blur', onBlur);
      field.removeEventListener('input', onInput);
    });
  });
  const onSubmit = event => {
    event.preventDefault();
    let isFormValid = true;
    for (const fieldId of FIELD_IDS) {
      if (!validateField(fieldId)) {
        isFormValid = false;
      }
    }
    if (!isFormValid) {
      if (statusEl) {
        statusEl.textContent = 'Revisa los campos marcados en rojo antes de enviar la solicitud.';
        statusEl.classList.remove('form-status--success');
        statusEl.classList.add('form-status--error');
      }
      const firstInvalid = form.querySelector('.form-field.has-error input, .form-field.has-error textarea');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }
    if (statusEl) {
      statusEl.textContent = '¡Formulario validado! Esta demostración no envía solicitudes. Contacta a la clínica para confirmar tu hora.';
      statusEl.classList.remove('form-status--error');
      statusEl.classList.add('form-status--success');
    }
    form.reset();
    for (const fieldId of FIELD_IDS) {
      clearFieldValidation(fieldId);
    }
  };
  form.addEventListener('submit', onSubmit);
  cleanupCallbacks.push(() => form.removeEventListener('submit', onSubmit));
  return () => {
    for (const cleanup of cleanupCallbacks) {
      cleanup();
    }
  };
}
function ensureErrorElement(field, fieldId) {
  const wrapper = field.closest('.form-field');
  if (!wrapper) {
    return;
  }
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
function clearFieldValidation(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return;
  }
  const wrapper = field.closest('.form-field');
  const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
  if (wrapper) {
    wrapper.classList.remove('has-error');
  }
  field.setAttribute('aria-invalid', 'false');
  if (errorEl) {
    errorEl.textContent = '';
  }
}
function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return true;
  }
  const wrapper = field.closest('.form-field');
  const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
  const message = getFieldError(fieldId, field.value);
  const isValid = message === "";
  if (wrapper) {
    wrapper.classList.toggle('has-error', !isValid);
  }
  field.setAttribute('aria-invalid', String(!isValid));
  if (errorEl) {
    errorEl.textContent = message;
  }
  return isValid;
}
