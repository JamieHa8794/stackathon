import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { removeFromBag } from '../store/bagReducers';
import {updateTrainerInfo} from '../store/trainerReducers';


class Battle extends Component{
    constructor(props){
        super(props);
        this.state = {
            _pokemon: '',
            _oppPokemon: {},
            _pokemonHealth: 0,
            _oppPokemonHealth : 0,
            _myCount: 0,
            _oppCount: 0,
        }
        this.removePokemon = this.removePokemon.bind(this);
        this.attack = this.attack.bind(this)
    }
    componentDidMount(){
        console.log('hererererere')
        if(this.props.pokemon.length !== 0 && this.props.bags.length !== 0 && this.props.auth.id !== undefined){
            const {pokemon, bags, auth, match: {params: {id} }, history} = this.props;
            const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)
            const myPokemon = [];
            myBagArr.map(_bagItem => {
                return (
                    myPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
                )
            })
           

            const _pokemon = myPokemon[0];
            let _pokemonHealth = _pokemon ? _pokemon.hp : 0


            this.setState({
                _pokemon: _pokemon,
                _pokemonHealth: _pokemonHealth,
            })
        }

        if(this.props.pokemon.length !== 0 && this.props.bags.length !== 0 && this.props.auth.id !== undefined){
            const {pokemon, bags, auth, match: {params: {id} }, history} = this.props;
            
            const opponentBagArr = bags.filter(_bagItem => _bagItem.trainerId === -1000)
            const oppPokemon = [];
            opponentBagArr.map(_bagItem => {
                return (
                    oppPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
                )
            })
            
            const _oppPokemon = oppPokemon[0];
            let _oppPokemonHealth = _oppPokemon ? _oppPokemon.hp : 0

            this.setState({
                _oppPokemon: _oppPokemon,
                _oppPokemonHealth : _oppPokemonHealth,
            })
        }
        console.log('componenetDidMount', this.state)
    }
    componentDidUpdate(prevProps, prevState){
        console.log('prevProps', prevProps)
        console.log('prevState', prevState)
        if(prevState._pokemonHealth <= 0 && this.props.pokemon.length !== 0 && this.props.bags.length !== 0 && this.props.auth.id !== undefined){
            const {pokemon, bags, auth, match: {params: {id} }, history} = this.props;
            const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)
            const myPokemon = [];
            myBagArr.map(_bagItem => {
                return (
                    myPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
                )
            })
           

            const _pokemon = myPokemon[0];
            let _pokemonHealth = _pokemon ? _pokemon.hp : 0


            this.setState({
                _pokemon: _pokemon,
                _pokemonHealth: _pokemonHealth,
            })
        }

        if(prevState._oppPokemonHealth <= 0 && this.props.pokemon.length !== 0 && this.props.bags.length !== 0 && this.props.auth.id !== undefined){
            const {pokemon, bags, auth, match: {params: {id} }, history} = this.props;
            
            const opponentBagArr = bags.filter(_bagItem => _bagItem.trainerId === -1000)
            const oppPokemon = [];
            opponentBagArr.map(_bagItem => {
                return (
                    oppPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
                )
            })
            
            const _oppPokemon = oppPokemon[0];
            let _oppPokemonHealth = _oppPokemon ? _oppPokemon.hp : 0

            this.setState({
                _oppPokemon: _oppPokemon,
                _oppPokemonHealth : _oppPokemonHealth,
            })

        }

    }

    removePokemon(pokemonNumber){
        const {pokemon} = this.props;

    }

    attack(_pokemonAttack, _pokemonDefense, _oppPokemonAttack, _oppPokemonDefense){
        // debugger;
        const {pokemon, removeFromBag, bags, auth, history} = this.props;
        const {_pokemonHealth, _oppPokemonHealth, _myCount, _oppCount} = this.state



        const newPokemonHp = (_pokemonHealth - Math.round(_oppPokemonAttack*Math.random()*.5))
        const newOppPokemonHp = (_oppPokemonHealth - Math.round(_pokemonAttack*Math.random()*.5))

        // const newPokemonHp = (_pokemonHealth - Math.round((_pokemonDefense - _oppPokemonAttack)*Math.random()*.5))
        // console.log('oppAttack',Math.round((_pokemonDefense - _oppPokemonAttack)*Math.random()*.5))
        // const newOppPokemonHp = (_oppPokemonHealth - Math.round((_oppPokemonDefense - _pokemonAttack)*Math.random()*.5))
        // console.log('pokemonAttack', Math.round((_oppPokemonDefense - _pokemonAttack)*Math.random()*.5))


        if(newPokemonHp <=0){

            this.setState({
                _pokemonHealth: 0,
            })

            const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)
            const myPokemon = [];
            myBagArr.map(_bagItem => {
                return (
                    myPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
                )
            })
            
            
            const _toRemove = myBagArr.find(_bagItem => _bagItem.pokemonId === this.state._pokemon.id).id
            this.setState({_myCount : _myCount +1 })
            removeFromBag(_toRemove)
            const _pokemon = myPokemon[1];
            
            console.log('pokemon[0]', pokemon[0])
            console.log('pokemon[1]', pokemon[1])

            this.setState({
                _pokemon: _pokemon,
                _pokemonHealth: _pokemon ? _pokemon.hp : 0,
            })

        }
        else if(newOppPokemonHp <= 0){
            this.setState({
                _oppPokemonHealth: 0
            })

            const opponentBagArr = bags.filter(_bagItem => _bagItem.trainerId === -1000)
            const oppPokemon = [];
            opponentBagArr.map(_bagItem => {
                return (
                    oppPokemon.push(pokemon.find(_pokemon => _pokemon.id === _bagItem.pokemonId))
                )
            })

            
            
            const _toRemove = opponentBagArr.find(_bagItem => _bagItem.pokemonId === this.state._oppPokemon.id).id
            this.setState({_oppCount : _oppCount + 1})
            removeFromBag(_toRemove)
            
            console.log('oppPokemon[0]', oppPokemon[0])
            console.log('oppPokemon[1]', oppPokemon[1])
            const _oppPokemon = oppPokemon[1];

            this.setState({
                _oppPokemon: _oppPokemon,
                _oppPokemonHealth : _oppPokemon ? _oppPokemon.hp : 0,
            })
        }
        else{
            this.setState({
                _pokemonHealth: newPokemonHp,
                _oppPokemonHealth: newOppPokemonHp,
            })
        }

       
    }

    render(){
        const {pokemon, bags, trainers, auth, match: {params: {id} }, history} = this.props;
        const myBagArr = bags.filter(_bagItem => _bagItem.trainerId === auth.id)

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
        
        if(trainers.length === 0){
            return(
                <div>
                    Whoops Trainers didnt load..
                </div>
            )
        }
        if(auth.id === undefined){
            return(<div>
                Whoops.. your auth id didnt load..
            </div>)
        }
        if(this.state._myCount === 3){
            const {updateTrainerInfo, trainer, history} = this.props
            const _trainer = trainers.find(_trainer => _trainer.id === auth.id)
            updateTrainerInfo(_trainer.id, _trainer.firstName, _trainer.lastName, _trainer.imgUrl, _trainer.wins, _trainer.losses + 1)
            history.push('/YouLost')

        }
        if(this.state._oppCount === 3){
            const {updateTrainerInfo, trainers} = this.props
            const _trainer = trainers.find(_trainer => _trainer.id === auth.id)
            updateTrainerInfo(_trainer.id, _trainer.firstName, _trainer.lastName, _trainer.imgUrl, _trainer.wins + 1, _trainer.losses)
            history.push('/YouWon')
        }
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
                        <div className='battleStats'> 
                            <div>
                                Health Points: {_pokemonHealth}
                            </div>
                            {/* <div>
                                Attack: {_pokemon.attack}
                            </div>
                            <div>
                                Defense: {_pokemon.defense}
                            </div>
                            <div>
                                Speed: {_pokemon.speed}
                            </div> */}
                        </div> 
                        <button onClick={()=>this.attack(_pokemon.attack, _pokemon.defense, _oppPokemon.attack, _oppPokemon.defense)}>Attack!</button>  
                    </div>
                    <div className='battleVs'>... VS ...</div>
                    <div className='battleOpponentPokemon'>
                        <img src={`../images/${_oppPokemon.name}.png`}/>
                        <div>
                            {_oppPokemon.name}
                        </div>
                        <div>
                            No. {_oppPokemon.number}
                        </div>  
                        <div className='battleStats'> 
                            <div>
                            Health Points: {_oppPokemonHealth}
                            </div>
                            {/* <div>
                                Attack: {_oppPokemon.attack}
                            </div>
                            <div>
                                Defense: {_oppPokemon.defense}
                            </div>
                            <div>
                                Speed: {_oppPokemon.speed}
                            </div> */}
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
        updateTrainerInfo : (id, firstName, lastName, imgUrl, win, loss) =>{
            dispatch(updateTrainerInfo(id, firstName, lastName, imgUrl, win, loss, history))
        }
    }
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Battle)