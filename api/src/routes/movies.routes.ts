import {Router} from 'express';
import tmdb from './tmdb';

const router = Router();

router.get('/', async (req, res) => {
    res.json({ message: 'Lista Filmes' });
})

router.get('/em-cartaz', async (req, res) => {
    try {
        const response = await tmdb.get('movie/now_playing?language=pt-BR&page=1');
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao consultar a API em cartaz: ", err });
    }
});

router.get('/em-breve', async (req, res) => {
    try {
        const response = await tmdb.get('movie/upcoming?language=pt-BR&page=1&region=BR');
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao consultar a API em breve: ", err });
    }
});

router.get('/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const response = await tmdb.get(`movie/${movieId}?language=pt-BR`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao consultar a API detalhes do filme: ", movieId, err})
    }
});

export default router;