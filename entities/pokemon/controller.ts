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
