import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

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
    }
    render(){
        const {pokemon} = this.props;
        return(
        <div>
            <Link to='/trainer/myBag'>View My Bag</Link>
            <ul className='pokemonUl'>
                {pokemon.map(_pokemon =>{
                    return(
                        <li className='pokemonLi' key={_pokemon.id}>
                            <Link to={`/pokemon/${_pokemon.number}`}>
                            <img src={`images/${_pokemon.name}.png`}/>
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