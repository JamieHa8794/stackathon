import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {updatePokemon} from '../store/pokemonReducers'


class Battle extends Component{
    constructor(props){
        super(props);
        this.state = {
            myPokemonHp: 0,
            oppPokemonHp : 0,
        }
        this.removePokemon = this.removePokemon.bind(this);
        this.attack = this.attack.bind(this)
    }
    
   
    removePokemon(pokemonNumber){
        const {pokemon, updatePokemon} = this.props;

    }

    attack(_pokemonHealth, _pokemonAttack, _oppPokemonHealth, _oppPokemonAttack){
        console.log(_pokemonHealth, _oppPokemonHealth)

        this.setState({
            myPokemonHp: (_pokemonHealth - Math.round(_oppPokemonAttack*Math.random()*.5)),
            oppPokemonHp: (_oppPokemonHealth - Math.round(_pokemonAttack*Math.random()*.5)),
        })
        console.log('state', this.state)
    }

    render(){
        const {pokemon, bags, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)
        const myPokemon = [];
        myBagArr.map(_bagItem => {
            return (
                myPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
            )
        })
        const opponentBagArr = bags.filter(_bagItem => _bagItem.trainerId === -1000)
        const oppPokemon = [];
        opponentBagArr.map(_bagItem => {
            return (
                oppPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
            )
        })
        
        
        if(pokemon.length === 0){
            return(<div>No Pokemon found here :(</div>)
        }
        
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
        if(opponentBagArr.length === 0){
            return(
                <div>
                    <Link to='/Pokemon'>Back to All Pokemon</Link>
                    <div>
                        You won! 
                    </div>
                </div>
            )
        }

        else{
            const _pokemon = myPokemon[0];
            let _pokemonHealth = _pokemon ? _pokemon.hp : 0
            const _oppPokemon = oppPokemon[0];
            let _oppPokemonHealth = _oppPokemon ? _oppPokemon.hp : 0

            
            // const {_pokemon, _oppPokemon, _pokemonHealth, _oppPokemonHealth} = this.state;
            if(_pokemon === undefined){
                return(<div>No Pokemon found here</div>)
            }


    
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
                                HP: {_pokemonHealth}
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
                        <button onClick={()=>this.attack(_pokemonHealth, _pokemon.attack, _oppPokemonHealth, _oppPokemon.attack)}>Attack!</button>  
                    </div>
                    <div className='battleOpponentPokemon'>
                        <img src={`../images/${_oppPokemon.name}.png`}/>
                        <div>
                            {_oppPokemon.name}
                        </div>
                        <div>
                            No. {_oppPokemon.number}
                        </div>  
                        <div className='stats'> 
                            <div>
                                HP: {_oppPokemonHealth}
                            </div>
                            <div>
                                Attack: {_oppPokemon.attack}
                            </div>
                            <div>
                                Defense: {_oppPokemon.defense}
                            </div>
                            <div>
                                Speed: {_oppPokemon.speed}
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