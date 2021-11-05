import React, {Component} from 'react'
import {connect} from 'react-redux'


class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
      const {auth, trainers} = this.props;
      const _trainer = trainers.find(_trainer => _trainer.id === auth.id)

      if(trainers.length === 0){
        return(<div>Welcome!</div>)
      }
      if(auth.id === undefined){
        return(<div>Welcome!</div>)
      }
        return(
            <div>
                <img className='homeImg' src={_trainer.imgUrl}/>
                <div>
                  Welcome, {_trainer.firstName}
                </div>
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(Home)