import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Pokemon from './components/Pokemon'
import SinglePokemon from './components/SinglePokemon'
import AddTrainerInfo from './components/AddTrainerInfo'
import MyBag from './components/MyBag'
import Battle from './components/Battle'
import HowToPlay from './components/HowToPlay'
import {_loadPokemon, loadPokemon} from './store/pokemonReducers'
import {_loadBags, loadBags} from './store/bagReducers'
import {_loadTrainers, loadTrainers} from './store/trainerReducers'
import {_loadTypes, loadTypes} from './store/typesReducers'
import MyProfile from './components/MyProfile';
import YouWon from './components/YouWon';
import YouLost from './components/YouLost';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props._loadPokemon();
    this.props._loadBags();
    this.props._loadTrainers();
    this.props._loadTypes();
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        <Route exact path='/pokemon' component={Pokemon}/>
        <Route exact path='/pokemon/:id' component={SinglePokemon}/>
        <Route exact path='/trainer/addTrainerInfo' component={AddTrainerInfo}/>
        <Route exact path='/trainer/myBag' component={MyBag}/>
        <Route exact path='/Battle' component={Battle}/>
        <Route exact path='/HowToPlay' component={HowToPlay}/>
        <Route exact path='/YouWon' component={YouWon}/>
        <Route exact path='/YouLost' component={YouLost}/>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path='/MyProfile' component={MyProfile}/>
            {/* <Redirect to="/home" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    _loadPokemon: async () =>{
      dispatch(loadPokemon())
    },
    _loadBags: async () =>{
      dispatch(loadBags())
    },
    _loadTrainers: async () =>{
      dispatch(loadTrainers())
    },
    _loadTypes: async () =>{
      dispatch(loadTypes())
    }

  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
