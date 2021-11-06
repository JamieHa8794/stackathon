import React, {Component} from 'react'
import {connect} from 'react-redux'


class MyProfile extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const{auth, trainers} = this.props
        const _trainer = trainers.find(_trainer => _trainer.id === auth.id)
        if(trainers.length === 0){
            return(<div>Opps, trainers didnt load</div>)
        }
        if(auth.id === undefined){
            return(<div>Opps, your auth id didnt load</div>)
        }
        
        const winRate = _trainer.wins === 0 ? 0 : _trainer.wins/(_trainer.wins+_trainer.losses)

        return(
            <div className='profile'>
                <img src={_trainer.imgUrl}/>
                <div className='profileDetails'>
                    <div>
                        First Name: {_trainer.firstName}
                    </div>
                    <div>
                        Last Name: {_trainer.lastName}
                    </div>
                    <div>
                        Wins: {_trainer.wins}
                    </div>
                    <div>
                        Losses: {_trainer.losses}
                    </div>
                    <div>
                        Win Rate: {winRate}
                    </div>
                </div>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(MyProfile)