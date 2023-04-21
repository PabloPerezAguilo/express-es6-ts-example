import express from 'express'
import {createPokemon, listPokemon, detailPokemon} from './controller.js'
import {auth} from '../../core/middlewares.js'

const router = express.Router();

router.get('/', async (req, res, next)=> {
    try {
        res.json(await listPokemon(req.query.name))
    } catch(e) {
        next(e)
    }
    
});

router.get('/:id', async (req, res, next)=> {
    try {
        const data = await detailPokemon(req.params.id);
        if(!data) return next(new Error('NOT_FOUND'))
        res.json(data)
    } catch(e) {
        next(e)
    }
});

router.post('/', auth, async (req, res, next)=> {
    try {
        res.json(await createPokemon(req.body, req.token))
    } catch(e) {
        next(e)
    }
});

export default router;
