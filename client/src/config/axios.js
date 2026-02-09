import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://tierhire.onrender.com";
axios.defaults.withCredentials = true;
