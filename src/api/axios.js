import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Assurez-vous que JSON Server tourne sur ce port
});

export default instance;
