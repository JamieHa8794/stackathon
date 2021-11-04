import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {updatePokemon} from '../store/pokemonReducers'


class Battle extends Component{
    constructor(props){
        super(props);
        this.state = {
            opponentBagArr: []
        }
        this.removePokemon = this.removePokemon.bind(this);
    }
    
    removePokemon(pokemonNumber){
        const {pokemon, updatePokemon} = this.props;
        updatePokemon(pokemonNumber, null);
    }
    render(){
        // pokemon.find(_pokemon => _pokemon.number === Math.round(Math.random()*pokemon.length))

        const {pokemon, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = pokemon.filter(_pokemon => _pokemon.bagId === auth.id)

        if(myBagArr.length === 0){
            return(
                <div>
                    <Link to='/Pokemon'>Back to All Pokemon</Link>
                    <div>
                        Oh No! Looks like all your pokemon have lost. 
                    </div>
                </div>
            )
        }
        else{
            const _pokemon = myBagArr[0];
            const {opponentBagArr} = this.state
            console.log(opponentBagArr)
            return(
                <div className='battle'>
                    <div className='battleMyPokemon'>
                        <img src={`../images/${_pokemon.name}.png`}/>
                        <div>
                            {_pokemon.name}
                        </div>
                        <div>
                            No. {_pokemon.number}
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
                    <div className='battleOpponentPokemon'>
                        <img src={`../images/${_pokemon.name}.png`}/>
                        <div>
                            {_pokemon.name}
                        </div>
                        <div>
                            No. {_pokemon.number}
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
            )
        }

    }
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return{
        updatePokemon: (pokemonId, bagId) =>{
            dispatch(updatePokemon(pokemonId, bagId, history))
        }
    }
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Battle)