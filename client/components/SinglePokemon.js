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
        const {addToBag, auth, match: {params: {id} }, history} = this.props;
        // updatePokemon(id, auth.id);
        console.log(id)
        addToBag(auth.id, id);
        history.push('/trainer/myBag')
    }
    render(){
        const {pokemon, types, match: {params: {id} }} = this.props;
        const {onClick} = this

        if(pokemon.length === 0){
            return(<div>No Pokemon found here :(</div>)
        }
        const _pokemon = pokemon.find(_pokemon => _pokemon.number === id*1)
        if(_pokemon === undefined){
            return(<div>No Pokemon found here :(</div>)
        }
        if(types.length === 0){
            return(<div>No types found</div>)
        }

        const _type = types.find(_type => _type.id === _pokemon.typeId).type



        return(
            <div>
                <Link className='back' to="/pokemon">Back to All Pokemon</Link>
                <div className='singlePokemon'>
                    <img src={`../images/${_pokemon.name}.png`}/>
                    <div className='pokemonDetails'>
                        <div className='singlePName'>
                            {_pokemon.name}
                        </div>
                        <button onClick={onClick}>Pick Pokemon</button>
                        <div className='singlePNum'>
                            No. {_pokemon.number}
                        </div>
                        <div className='singlePType'>
                            Type: {_type}
                        </div>
                        <div className='aboutMe'>
                            About Me: {_pokemon.description}
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