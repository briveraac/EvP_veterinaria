import api from './api.js';

// Llamadas a la API REST de usuarios: /api/v1/usuarios (solo Administrador).
class UsuarioService {
  getAll() {
    return api.get('/usuarios');
  }

  create(usuario) {
    return api.post('/usuarios', usuario);
  }

  update(id, usuario) {
    return api.put(`/usuarios/${id}`, usuario);
  }
}

export default new UsuarioService();
