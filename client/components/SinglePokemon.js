import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const SinglePokemon = ({pokemon, match:{params: {id}}, history }) => {
    if(pokemon.length === 0){
        return(<div>No Pokemon found here :(</div>)
    }
    const _pokemon = pokemon.find(_pokemon => _pokemon.id === id*1)
    if(_pokemon === undefined){
        return(<div>No Pokemon found here :(</div>)
    }
    return(
        <div>
            <Link className='back' to="/pokemon">Back to All Pokemon</Link>
            <div className='singlePokemon'>
                <img src={`../images/${_pokemon.name}.png`}/>
                <div className='pokemonDetails'>
                    <div>
                        {_pokemon.name}
                    </div>
                    <button>Pick Pokemon</button>
                    <div>
                        No. {_pokemon.number}
                    </div>
                    <div>
                        Type: {_pokemon.type}
                    </div>
                    <div>
                        {_pokemon.description}
                    </div>
                    <div className='stats'> 
                        <div>
                            HP: {_pokemon.hp}
                        </div>
                        <div>
                            Attack: {_pokemon.attack}
                        </div>
                        <div>
                            Defense: {_pokemon.defense}
                        </div>
                        <div>
                            Speed: {_pokemon.speed}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(SinglePokemon)