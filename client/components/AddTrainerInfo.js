import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createTrainerProfile} from '../store/trainerReducers'

const trainerImgs = [
    {
        url: 'https://cdn2.bulbagarden.net/upload/thumb/f/f7/Lets_Go_Pikachu_Eevee_Lorelei.png/162px-Lets_Go_Pikachu_Eevee_Lorelei.png', 
        name: 'Lorelei'
    },
    {
        url: 'https://cdn2.bulbagarden.net/upload/thumb/5/5c/Lets_Go_Pikachu_Eevee_Agatha.png/183px-Lets_Go_Pikachu_Eevee_Agatha.png',
        name: 'Agatha'
    },
    {
        url: 'https://cdn2.bulbagarden.net/upload/thumb/f/f8/Omega_Ruby_Alpha_Sapphire_Phoebe.png/150px-Omega_Ruby_Alpha_Sapphire_Phoebe.png',
        name: 'Phoebe',
    },
    {
        url: 'https://cdn2.bulbagarden.net/upload/thumb/1/1f/Sword_Shield_Victor.png/130px-Sword_Shield_Victor.png',
        name: 'Victor',
    },
    {
        url: 'https://cdn2.bulbagarden.net/upload/thumb/a/af/Sword_Shield_Bede.png/170px-Sword_Shield_Bede.png',
        name: 'Bede',
    },
    {
        url: 'https://cdn2.bulbagarden.net/upload/thumb/a/a3/Marcus.png/130px-Marcus.png',
        name: 'Marcus',
    }
]


class AddTrainerInfo extends Component{
    constructor(props){
        super(props);
        const {trainer, auth} = this.props;
        // this.state = {
        //     id: trainer.id ? trainer.id : '',
        //     firstName: trainer.firstName ? trainer.firstName : '',
        //     lastName: trainer.lastName ? trainer.lastName : '',
        //     imgUrl: trainer.imgUrl ? trainer.imgUrl : '',
        // }
        this.state = {
            id: auth ? auth.id : '',
            firstName: '',
            lastName: '',
            imgUrl: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(event){
        const change = {};
        change[event.target.name] = event.target.value;
        change.id = this.props.auth.id;
        this.setState(change);
    }
    onSubmit(event){
        const {id, firstName, lastName, imgUrl} = this.state;
        console.log(id)
        event.preventDefault();
        if(firstName === ''){
            window.alert('First Name is requried');
        }
        else if(lastName === ''){
            window.alert('Last Name is required');
        }
        else if(imgUrl === ''){
            window.alert('Please Choose an Avatar')
        }
        else{
            this.props.createTrainerProfile(id, firstName, lastName, imgUrl)
        }
    }
    render(){
        const {firstName, lastName, imgUrl} = this.state;
        const {onChange, onSubmit} = this
        return(
            <div className='trainerDetails'>
                <img src={imgUrl ? imgUrl : 'https://tribbyfam.github.io/pokemon-gym/css/images/logo.png'}/>
                <form name="updateTrainerInfo" onSubmit={onSubmit}>
                    <label>First Name</label>
                    <input value={firstName} name='firstName' onChange={onChange}/>
                    <label>Last Name</label>
                    <input value={lastName} name='lastName' onChange={onChange}/>
                    <label>Select an Avatar</label>
                    <select value={imgUrl} name='imgUrl' onChange={onChange}>
                        <option>----</option>
                        {trainerImgs.map((img, idx) => {
                            return(
                                <option value={img.url} key={idx}>
                                    {img.name}
                                </option>
                            )}
                        )}
                    </select>
                    <br/>
                    <br/>
                    <button onSubmit={this.onSubmit}>Save Trainer Info</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return {
        createBag : () =>{
            dispatch(createBag())
        },
        createTrainerProfile : (id, firstName, lastName, imgUrl) =>{
            dispatch(createTrainerProfile(id, firstName, lastName, imgUrl, history))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTrainerInfo)