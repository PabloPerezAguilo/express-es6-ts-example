import Pokemon from './model.js'

export const listPokemon = async (name)=> {
    const filter: {name?: RegExp} = {};
    if(name) filter.name = new RegExp(name, 'i')
    return Pokemon.find(filter, {name: 1, type:1})
}

export const detailPokemon = async (id)=> {
    return Pokemon.findOne({_id:id}).populate('user')
}

export const createPokemon = async (data, token)=> {
    data.user = token.id;
    return Pokemon.create(data);
}

export const updatePokemon = async (id, data, token)=> {
    const pokemon = await Pokemon.findById(id);
    if(!pokemon || pokemon.user !== token.id) throw new Error('NOT_FOUND');
    data.user = token.id;
    return Pokemon.findOneAndUpdate({_id: id}, data, {new: true});
}

export const deletePokemon = async (id, token)=> {
    const res = await Pokemon.deleteOne({_id: id, user: token.id});
    if(res.deletedCount !== 1) throw new Error('NOT_FOUND')
}