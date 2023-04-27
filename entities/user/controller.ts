import User from './model.js'
import CONF from '../../core/conf.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const createUser = async (data)=> {
    if(!data.password || data.password.length < 6) throw new Error('PASSWORD_TOO_SHORT')
    data.password = await bcrypt.hash(data.password, CONF.SALT_ROUND)
    data.role = 'USER';
    return User.create(data);
}

export const login = async (data)=> {
    const user = await User.findOne({where: {email: data.email}});
    if(!user) return null;
    if(!(await bcrypt.compare(data.password, user.getDataValue('password')))) return null
    const token = jwt.sign({id: user.id, role: user.role}, CONF.JWT_SECRET, {expiresIn: '24h'});
    return {token}
}
