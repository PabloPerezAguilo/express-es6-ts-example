import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { MongoServerError } from 'mongodb';
import CONF from './conf.js'

export const auth = (req: Request, res: Response, next: NextFunction)=>{
    if(!req.headers.authorization) return next(new Error('AUTH_REQUIRED'));
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return next(new Error('AUTH_REQUIRED'));
    try {
        req.token = jwt.verify(token, CONF.JWT_SECRET)
    } catch(e){
        return next(new Error('TOKEN_INVALID'));
    }
}


export const handlerError = (err: Error | MongoServerError, req: Request, res: Response, next: NextFunction)=>{
    if(err.message === 'AUTH_REQUIRED') return res.status(403).json({error: 'AUTH_REQUIRED'})
    if(err.message === 'TOKEN_INVALID') return res.status(403).json({error: 'AUTH_REQUIRED'})
    if(err.message === 'NOT_FOUND') return res.status(404).json({error: 'NOT_FOUND'})
    if(err.message === 'PASSWORD_TOO_SHORT') return res.status(422).json({error: 'NOT_FOUND'})
    if(err instanceof MongoServerError && err.code === 11000) return res.status(422).json({error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPattern)})
    console.error(err);
    return res.status(500).json({error: 'SERVER_ERROR', err})
}