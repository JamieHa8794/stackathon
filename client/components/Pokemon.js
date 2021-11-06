import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import MyBag from './MyBag';

class Pokemon extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonType: '',
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(event){
        const {history} = this.props;
        history.push(`/Pokemon/FilterSort/${event.target.value}`)
    }
    render(){
        const {types, match} = this.props;
        const {pokemonType} = this.state;
        let {pokemon} = this.props
        const matchBy = match.params.by;

        if(matchBy !=undefined && matchBy !== 'AtoZ' && matchBy !== 'ZtoA'){
            if(types.length > 0){
                pokemon = pokemon.filter(_pokemon => _pokemon.typeId == (types.find(type => type.type === matchBy) ? types.find(type => type.type === matchBy).id : null) )
            }
        }
        if(matchBy === 'AtoZ'){
            pokemon.sort((A,B) => A.name.localeCompare(B.name))
        }
        if(matchBy === 'ZtoA'){
            pokemon.sort((A,B) => B.name.localeCompare(A.name))
        }

        let imgUrlHead = '../../images/'
        
        if(matchBy === undefined){
            pokemon.sort(function(a, b){return a.number-b.number})
            imgUrlHead = 'images/'
        }

            
        return(
        <div>
            <div className='sortFilterPokemon'>
                <div className='sort'>
                    <Link to='/Pokemon'>Pokedex No.</Link>
                    <Link to='/Pokemon/FilterSort/AtoZ'>A to Z</Link>
                    <Link to='/Pokemon/FilterSort/ZtoA'>Z to A</Link>
                    {/* <Link to='/Pokemon/'>No Sort</Link> */}
                </div>
                <div >
                    <select className='byType' value={pokemonType} onChange={this.onChange}>
                    <option>Filter by Type</option>
                        {types.map(type =>{
                            return(
                                <option key={type.id} value={type ? type.type : null} onChange={this.onChange}>
                                    {type ? type.type : null}
                                </option>
                            )
                        })}
                    </select>

                </div>
            </div>
            <ul className='pokemonUl'>
                {pokemon.map(_pokemon =>{
                    return(
                        <li className='pokemonLi' key={_pokemon.id}>
                            <Link to={`/pokemon/${_pokemon.number}`}>
                            <img src={`${imgUrlHead}${_pokemon.name}.png`}/>
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
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Pokemon)