import Pokemon from './model.js'

export const listPokemon = async (name)=> {
    if(name) return Pokemon.find({})
    return Pokemon.find({})
}

export const detailPokemon = async (id)=> {
    return Pokemon.findOne({_id:id}).populate('user')
}

export const createPokemon = async (data, token)=> {
    data.user = token.id;
    return Pokemon.create(data);
}

//TODO
export const deletePokemon = async (data, token)=> {
    data.user = token.id;
    return Pokemon.create(data);
}
