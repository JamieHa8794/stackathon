import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
  <div className='navBar'>
    <img className='navImg' src='https://i.ytimg.com/vi/srx8FPR3cc4/maxresdefault.jpg'/>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to='/trainer/myBag'>My Bag</Link>
          <Link to='/pokemon'>All Pokemon</Link>
          <Link to='/HowToPlay'>How To Play</Link>
          <Link to='/MyProfile'>My Profile</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to='/HowToPlay'>How To Play</Link>
        </div>
      )}
    </nav>

  </div>
  <hr />
</div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
