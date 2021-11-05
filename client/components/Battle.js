import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { removeFromBag } from '../store/bagReducers';



class Battle extends Component{
    constructor(props){
        super(props);
        this.state = {
            _pokemon: '',
            _oppPokemon: {},
            _pokemonHealth: 0,
            _oppPokemonHealth : 0,
        }
        this.removePokemon = this.removePokemon.bind(this);
        this.attack = this.attack.bind(this)
    }
    componentDidUpdate(prevProps, prevState){
        
        
        // console.log('prevState._pokemonHealth === 0', prevState.myPokemonHp === 0)
        // console.log('this.props.pokemon.length !== 0', this.props.pokemon.length !== 0)
        // console.log('this.props.bags.length !== 0', this.props.bags.length !== 0)
        // console.log('this.props.auth !== undefined', this.props.auth !== undefined)
        // console.log(this.props.auth.id)

        if((prevState._pokemonHealth <= 0 || prevState._oppPokemonHealth <= 0) && this.props.pokemon.length !== 0 && this.props.bags.length !== 0 && this.props.auth.id !== undefined){
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

            const _pokemon = myPokemon[0];
            console.log('myPokemon[0]', myPokemon[0])
            let _pokemonHealth = _pokemon ? _pokemon.hp : 0
            const _oppPokemon = oppPokemon[0];
            console.log('oppPokemon[0]', oppPokemon[0])
            let _oppPokemonHealth = _oppPokemon ? _oppPokemon.hp : 0

            // console.log('prevProps' , prevProps)
            // console.log('prevState', prevState)
            // console.log('this.props', this.props)

            this.setState({
                _pokemon: _pokemon,
                _oppPokemon: _oppPokemon,
                _pokemonHealth: _pokemonHealth,
                _oppPokemonHealth : _oppPokemonHealth,
            })
            console.log('this.state', this.state)
        }

                if((prevState._pokemonHealth <= 0 || prevState._oppPokemonHealth <= 0) && this.props.pokemon.length !== 0 && this.props.bags.length !== 0 && this.props.auth.id !== undefined){
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

            const _pokemon = myPokemon[0];
            console.log('myPokemon[0]', myPokemon[0])
            let _pokemonHealth = _pokemon ? _pokemon.hp : 0
            const _oppPokemon = oppPokemon[0];
            console.log('oppPokemon[0]', oppPokemon[0])
            let _oppPokemonHealth = _oppPokemon ? _oppPokemon.hp : 0

            // console.log('prevProps' , prevProps)
            // console.log('prevState', prevState)
            // console.log('this.props', this.props)

            this.setState({
                _pokemon: _pokemon,
                _oppPokemon: _oppPokemon,
                _pokemonHealth: _pokemonHealth,
                _oppPokemonHealth : _oppPokemonHealth,
            })
            console.log('this.state', this.state)
        }

    }

    removePokemon(pokemonNumber){
        const {pokemon} = this.props;

    }

    attack(_pokemonAttack, _pokemonDefense, _oppPokemonAttack, _oppPokemonDefense){
        const {pokemon, removeFromBag, bags, auth, history} = this.props;
        const {_pokemonHealth, _oppPokemonHealth} = this.state
        console.log(_pokemonHealth, _oppPokemonHealth)

        this.setState({
            _pokemonHealth: (_pokemonHealth - Math.round(_oppPokemonAttack*Math.random()*.5)),
            _oppPokemonHealth: (_oppPokemonHealth - Math.round(_pokemonAttack*Math.random()*.5)),
            // _pokemonHealth: (_pokemonHealth - (_pokemonAttack - _oppPokemonAttack) ),
            // _oppPokemonHealth: (_oppPokemonHealth - (_oppPokemonDefense - _pokemonAttack) )
        })
        console.log('state', this.state)

        if(this.state._pokemonHealth <= 0){
            const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)
            const _toRemove = myBagArr.find(_bagItem => _bagItem.pokemonId === this.state._pokemon.id).id
            console.log(_toRemove)
            removeFromBag(_toRemove)
        }
        if(this.state._oppPokemonHealth <= 0){
            console.log('here')
            const opponentBagArr = bags.filter(_bagItem => _bagItem.trainerId === -1000)
            const _toRemove = opponentBagArr.find(_bagItem => _bagItem.pokemonId === this.state._oppPokemon.id).id
            console.log(_toRemove)
            removeFromBag(_toRemove)
        }
    }

    render(){
        const {pokemon, bags, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)
        console.log(this.state)
        // const myPokemon = [];
        // myBagArr.map(_bagItem => {
        //     return (
        //         myPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
        //     )
        // })
        const opponentBagArr = bags.filter(_bagItem => _bagItem.trainerId === -1000)
        // const oppPokemon = [];
        // opponentBagArr.map(_bagItem => {
        //     return (
        //         oppPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
        //     )
        // })
        
        
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
            // const _pokemon = myPokemon[0];
            // let _pokemonHealth = _pokemon ? _pokemon.hp : 0
            // const _oppPokemon = oppPokemon[0];
            // let _oppPokemonHealth = _oppPokemon ? _oppPokemon.hp : 0


            const {_pokemon, _oppPokemon, _pokemonHealth, _oppPokemonHealth} = this.state;

            if(_pokemon === ''){
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
                        <button onClick={()=>this.attack(_pokemon.attack, _pokemon.defense, _oppPokemon.attack, _oppPokemon.defense)}>Attack!</button>  
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
        removeFromBag: (bagId) =>{
            dispatch(removeFromBag(bagId, history))
        },
    }
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Battle)