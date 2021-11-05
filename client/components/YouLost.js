import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class YouLost extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div>
                    Oh no! You lost... 
                </div>
                <Link to='/pokemon'>Try Again?</Link>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(YouLost)