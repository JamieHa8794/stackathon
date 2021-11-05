import { render } from 'enzyme';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {addToBag} from '../store/bagReducers'


class SinglePokemon extends Component{
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    onClick(){
        const {addToBag, auth, match: {params: {id} }} = this.props;
        // updatePokemon(id, auth.id);
        console.log(id)
        addToBag(auth.id, id);
    }
    render(){
        const {pokemon, match: {params: {id} }} = this.props;
        const {onClick} = this

        if(pokemon.length === 0){
            return(<div>No Pokemon found here :(</div>)
        }
        const _pokemon = pokemon.find(_pokemon => _pokemon.number === id*1)
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
                        <button onClick={onClick}>Pick Pokemon</button>
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

}

const mapDispatchToProps = (dispatch, {history}) =>{
    return{
        addToBag: (trainerId, pokemonId) =>{
            dispatch(addToBag(trainerId, pokemonId, history))
        }
    }
}

const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePokemon)