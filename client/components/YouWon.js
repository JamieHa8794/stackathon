import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class YouWon extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='results'>
                <div>
                    You did it!
                </div>
                <Link to='/pokemon'>Let do it again!</Link>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(YouWon)