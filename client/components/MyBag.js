import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {updatePokemon} from '../store/pokemonReducers'


class MyBag extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonType: '',
        }
        this.removePokemon = this.removePokemon.bind(this);
        this.startBattle = this.startBattle.bind(this);
    }
    removePokemon(pokemonNumber){
        const {pokemon, updatePokemon} = this.props;
        console.log(pokemonNumber)
        updatePokemon(pokemonNumber, null);
    }
    startBattle(){
        const {pokemon, updatePokemon} = this.props;
        // while(pokemon.filter(_pokemon => _pokemon.bagId === -1000).length < 3){
        //     let pokemonNumber = Math.round(Math.random()*pokemon.length)
        //     updatePokemon(pokemonNumber, -1000);
        // }
        if(pokemon.filter(_pokemon => _pokemon.bagId === -1000).length < 3){
            for(let i = 0; i<3; i++){
                let pokemonNumber = Math.round(Math.random()*pokemon.length)
                updatePokemon(pokemonNumber, -1000);
            }
        }
        console.log(pokemon.filter(_pokemon => _pokemon.bagId === -1000))
    }
    render(){
        const {pokemon, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = pokemon.filter(_pokemon => _pokemon.bagId === auth.id)
        console.log(myBagArr)
        if(myBagArr.length === 0){
            return(
                <div>
                    <Link to='/Pokemon'>Back to All Pokemon</Link>
                    <div>
                    Theres no pokemon in your bag! Choose one to get started!
                    </div>
                </div>
            )
        }
        if(myBagArr.length > 3){
            console.log(myBagArr.length)
            const {onClick} = this
            return(
                <div>
                    <div>
                        You can only have 3 pokemon in your bag! Remove some to get started!
                    </div>
                    <ul className='myBagPokemonUl'>
                        {myBagArr.map(_pokemon =>{
                            return(
                                <li className='myBagPokemonLi' key={_pokemon.id}>
                                    <Link to={`/pokemon/${_pokemon.number}`}>
                                    <img src={`../images/${_pokemon.name}.png`}/>
                                    <div>
                                        {_pokemon.name}
                                    </div>
                                    <div>
                                        No. {_pokemon.number}
                                    </div>
                                    </Link>
                                    <button onClick={() => this.removePokemon(_pokemon.number)}>Remove Pokemon</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        if(myBagArr.length < 3){
            return(
            <div>
                {console.log(myBagArr.length)}
                <Link to='/Pokemon'>Back to All Pokemon</Link>
                <div>
                    You must have 3 pokemon to start the battle!
                </div>
                <ul className='myBagPokemonUl'>
                    {myBagArr.map(_pokemon =>{
                        return(
                            <li className='myBagPokemonLi' key={_pokemon.id}>
                                <Link to={`/pokemon/${_pokemon.number}`}>
                                <img src={`../images/${_pokemon.name}.png`}/>
                                <div>
                                    {_pokemon.name}
                                </div>
                                <div>
                                    No. {_pokemon.number}
                                </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>  
            )
        }
        else{
            const {startBattle} = this
            return(
            <div>
                {console.log(myBagArr.length)}
                <Link to='/Pokemon'>Back to All Pokemon</Link>
                <ul className='myBagPokemonUl'>
                    {myBagArr.map(_pokemon =>{
                        return(
                            <li className='myBagPokemonLi' key={_pokemon.id}>
                                <Link to={`/pokemon/${_pokemon.number}`}>
                                <img src={`../images/${_pokemon.name}.png`}/>
                                <div>
                                    {_pokemon.name}
                                </div>
                                <div>
                                    No. {_pokemon.number}
                                </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={startBattle}>Lets Start Battling!</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyBag)