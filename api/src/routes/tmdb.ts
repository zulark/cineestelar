import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log("Token carregado:", process.env.TMDB_TOKEN ? "Sim" : "Não");

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        "Content-Type": "application/json"
    }
});

export default tmdb;