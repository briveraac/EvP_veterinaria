const VALID_SPECIES = ['perro', 'gato', 'conejo', 'ave']

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
      if (!value) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selected = new Date(`${value}T00:00:00`)
      return selected >= today
    },
    message: 'Elige una fecha igual o posterior a hoy.',
  },
  reason: {
    validate: (value) => value.trim().length >= 10,
    message: 'Cuéntanos el motivo de la consulta (mínimo 10 caracteres).',
  },
}

export function initAppointmentForm() {
  const form = document.getElementById('appointmentForm')
  if (!form) return () => {}

  const statusEl = document.getElementById('formStatus')
  const cleanupCallbacks = []

  Object.keys(FIELD_RULES).forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (!field) return

    ensureErrorElement(field, fieldId)

    const onBlur = () => validateField(fieldId)
    const onInput = () => {
      const wrapper = field.closest('.form-field')
      if (wrapper && wrapper.classList.contains('has-error')) {
        validateField(fieldId)
      }
    }

    field.addEventListener('blur', onBlur)
    field.addEventListener('input', onInput)

    cleanupCallbacks.push(() => {
      field.removeEventListener('blur', onBlur)
      field.removeEventListener('input', onInput)
    })
  })

  const onSubmit = (event) => {
    event.preventDefault()

    const isFormValid = Object.keys(FIELD_RULES)
      .map((fieldId) => validateField(fieldId))
      .every(Boolean)

    if (!isFormValid) {
      if (statusEl) {
        statusEl.textContent = 'Revisa los campos marcados en rojo antes de enviar la solicitud.'
        statusEl.classList.remove('form-status--success')
        statusEl.classList.add('form-status--error')
      }

      const firstInvalid = form.querySelector('.form-field.has-error input, .form-field.has-error textarea')
      if (firstInvalid) firstInvalid.focus()
      return
    }

    if (statusEl) {
      statusEl.textContent = '¡Formulario validado! Esta demostración no envía solicitudes. Contacta a la clínica para confirmar tu hora.'
      statusEl.classList.remove('form-status--error')
      statusEl.classList.add('form-status--success')
    }

    form.reset()
    Object.keys(FIELD_RULES).forEach(clearFieldValidation)
  }

  form.addEventListener('submit', onSubmit)
  cleanupCallbacks.push(() => form.removeEventListener('submit', onSubmit))

  return () => {
    cleanupCallbacks.forEach((cleanup) => cleanup())
  }
}

function ensureErrorElement(field, fieldId) {
  const wrapper = field.closest('.form-field')
  if (!wrapper) return

  let errorEl = wrapper.querySelector('.field-error')
  if (!errorEl) {
    errorEl = document.createElement('p')
    errorEl.className = 'field-error'
    errorEl.id = `${fieldId}Error`
    errorEl.setAttribute('role', 'alert')
    wrapper.appendChild(errorEl)
  }

  field.setAttribute('aria-describedby', errorEl.id)
}

function clearFieldValidation(fieldId) {
  const field = document.getElementById(fieldId)
  if (!field) return

  const wrapper = field.closest('.form-field')
  const errorEl = wrapper ? wrapper.querySelector('.field-error') : null
  if (wrapper) wrapper.classList.remove('has-error')
  field.setAttribute('aria-invalid', 'false')
  if (errorEl) errorEl.textContent = ''
}

function validateField(fieldId) {
  const field = document.getElementById(fieldId)
  const rule = FIELD_RULES[fieldId]
  if (!field || !rule) return true

  const wrapper = field.closest('.form-field')
  const errorEl = wrapper ? wrapper.querySelector('.field-error') : null
  const isValid = rule.validate(field.value)

  if (wrapper) wrapper.classList.toggle('has-error', !isValid)
  field.setAttribute('aria-invalid', String(!isValid))
  if (errorEl) errorEl.textContent = isValid ? '' : rule.message

  return isValid
}
