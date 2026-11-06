import axios from 'axios';

// Dirección del backend. Se puede cambiar con la variable VITE_API_URL en un archivo .env.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const BASE_URL = API_URL + '/api/citas';

class CitaService {
  getAll() {
    return axios.get(BASE_URL);
  }

  getById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  create(cita) {
    return axios.post(BASE_URL, cita);
  }

  update(id, cita) {
    return axios.put(`${BASE_URL}/${id}`, cita);
  }

  delete(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

// Devuelve el mensaje que envía el backend o uno general si no hay conexión.
export function errorMessage(error) {
  if (error.response && error.response.data && error.response.data.mensaje) {
    return error.response.data.mensaje;
  }
  return 'No se pudo conectar con el servidor. Revisa que el backend esté encendido.';
}

export default new CitaService();
