import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {removeFromBag} from '../store/bagReducers'
import {addToBag} from '../store/bagReducers'

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
        const {bags, removeFromBag, pokemon, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = bags.filter(bag => bag.trainerId === auth.id)
        const _bagItem = myBagArr.find(_bag => _bag.pokemonId === pokemonNumber)
        removeFromBag(_bagItem.id);
        history.push(`/trainer/myBag`)
    }
    startBattle(){

        const {bags, addToBag, pokemon, auth, match: {params: {id} }, history} = this.props;
        let myBagArr = bags.filter(bag => bag.trainerId === -1000)
        console.log(myBagArr)
        if(myBagArr.length < 3){
            for(let i = 0; i<(3-myBagArr.length); i++){
                console.log(Math.round(Math.random()*pokemon.length))
                addToBag(-1000, Math.round(Math.random()*pokemon.length))
            }
        }
        // if(myBagArr.length === 3){
        //     history.push('/Battle')
        // }
        setTimeout(()=> {history.push('/Battle')}, 50)
       
        
    }
    render(){
        const {bags, pokemon, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = bags.filter(bag => bag.trainerId === auth.id)
        const myPokemon = [];
        
        myBagArr.map(_bagItem => {
            return (
                myPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
            )
        })
        if(pokemon.length === 0){
            return(<div>No Pokemon Here :(</div>)
        }
        
        if(auth.id === undefined){
            return(<div>Whoops... auth didnt load</div>)
        }
        
        
        if(myPokemon.length === 0){
            return(
                <div>
                    <Link to='/Pokemon'>Back to All Pokemon</Link>
                    <div>
                    Theres no pokemon in your bag! Choose one to get started!
                    </div>
                </div>
            )
        }

        if(bags.length === 0){
            return(<div>No Pokemon Here :(</div>)
        }

        if(myPokemon.length > 3){
            console.log(myPokemon.length)
            const {onClick} = this
            return(
                <div>
                    <div>
                        You can only have 3 pokemon in your bag! Remove some to get started!
                    </div>
                    <ul className='myBagPokemonUl'>
                        {myPokemon.map((_pokemon, idx) =>{
                            return(
                                <li className='myBagPokemonLi' key={idx}>
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
        if(myPokemon.length < 3){
            return(
            <div>
                <Link to='/Pokemon'>Back to All Pokemon</Link>
                <div>
                    You must have 3 pokemon to start the battle!
                </div>
                <ul className='myBagPokemonUl'>
                    {myPokemon.map(_pokemon =>{
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
        else{
            const {startBattle} = this
            return(
            <div>
                <Link to='/Pokemon'>Back to All Pokemon</Link>
                <ul className='myBagPokemonUl'>
                    {myPokemon.map(_pokemon =>{
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
                <button onClick={startBattle}>Lets Start Battling!</button>
            </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return{
        removeFromBag: (bagId) =>{
            dispatch(removeFromBag(bagId, history))
        },
        addToBag: (trainerId, pokemonId) =>{
            dispatch(addToBag(trainerId, pokemonId, history))
        },
    }
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBag)