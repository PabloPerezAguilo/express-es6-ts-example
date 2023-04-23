import express from 'express'
import {createPokemon, listPokemon, detailPokemon, updatePokemon, deletePokemon} from './controller.js'
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

router.put('/:id', auth, async (req, res, next)=> {
    try {
        res.json(await updatePokemon(req.params.id, req.body, req.token))
    } catch(e) {
        next(e)
    }
});

router.delete('/:id', auth, async (req, res, next)=> {
    try {
        await deletePokemon(req.params.id, req.token)
        res.status(204).json()
    } catch(e) {
        next(e)
    }
});

export default router;
