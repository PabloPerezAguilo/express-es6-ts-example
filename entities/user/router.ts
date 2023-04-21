import express from 'express'
import {createUser, login} from './controller.js'

const router = express.Router();


router.post('/', async (req, res, next)=> {
    try {
        res.json(await createUser(req.body))
    } catch(e) {
        next(e)
    }
});

router.post('/login', async (req, res, next)=> {
    try {
        res.json(await login(req.body))
    } catch(e) {
        next(e)
    }
});


export default router;