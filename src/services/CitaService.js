import api, { errorMessage } from './api.js';

// Llamadas a la API REST de citas: /api/v1/citas
// El token se agrega solo (ver el interceptor en api.js).
class CitaService {
  getAll() {
    return api.get('/citas');
  }

  getById(id) {
    return api.get(`/citas/${id}`);
  }

  create(cita) {
    return api.post('/citas', cita);
  }

  update(id, cita) {
    return api.put(`/citas/${id}`, cita);
  }

  delete(id) {
    return api.delete(`/citas/${id}`);
  }
}

export { errorMessage };
export default new CitaService();
