import axios from 'axios';

// Creamos una instancia de axios con la configuración base
const api = axios.create({

  // Usa variables de entorno para la URL base
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
