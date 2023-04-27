import User from '../user/model.js';
import Pokemon from './model.js'

export const listPokemon = async (name)=> {
    const filter: {name?: RegExp} = {};
    if(name) filter.name = new RegExp(name, 'i')
    return Pokemon.findAll() // ToDo: filro
}

export const detailPokemon = async (id)=> {
    return Pokemon.findAll({
        where: {id: id},
        include: [{
          model: User,
          required: true
         }]
      })
}

export const createPokemon = async (data, token)=> {
    data.userId = token.id;
    return Pokemon.create(data);
}

export const updatePokemon = async (id, data, token)=> {
    const pokemon = await Pokemon.findByPk(id);
    if(!pokemon || pokemon.user !== token.id) throw new Error('NOT_FOUND');
    data.user = token.id;
    await pokemon.update(data)
    return pokemon;
}

export const deletePokemon = async (id, token)=> {
    const res = await Pokemon.destroy({where:{ id: id, userId: token.id}});
    if(res !== 1) throw new Error('NOT_FOUND')
}