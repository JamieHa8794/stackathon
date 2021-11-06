import React, {Component} from 'react'
import {connect} from 'react-redux'


class HowToPlay extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const{auth} = this.props
        if(auth.id !== undefined){
            return(
                <div className='howTo'>
                <div className="howTitle">
                    How To Play:
                </div>
                <div className='howDes'>
                    <div>
                    Check out all of the pokemon. 
                    </div>
                    <div>
                    Pick 3 pokemon and battle an opponent!
                    </div>
                    {/* <div>
                    Check out your profile to see your stats!
                    </div> */}
                </div>
            </div>
            )
        }
        return(
            <div className='howTo'>
                <div className="howTitle">
                    How To Play:
                </div>
                <div className='howDes'>
                    <div>
                    To get started, sign up and fill out your profile - or log back in!
                    </div>
                    <div>
                    Check out all of the pokemon. 
                    </div>
                    <div>
                    Pick 3 pokemon and battle an opponent!
                    </div>
                    {/* <div>
                    Check out your profile to see your stats!
                    </div> */}
                </div>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(HowToPlay)