import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { callAPI } from '../config/Utility'

export default class UserDetailScreen extends Component {
    constructor(props){
        super(props)
        let navigationParam = this.props.navigation.state.params
        let user
        if(navigationParam && navigationParam.user){
            user = navigationParam.user
        }
        this.state={
            user,
            userDetail : {}
        }
    }

    componentDidMount(){
        this.callUserAPI()
    }

    callUserAPI = () =>{
        const { user } = this.state
        callAPI('userDetail',user).then((res)=>{
            this.setState({
                userDetail :res
            },()=>console.log(this.state.userDetail))
        })
    }
    render() {
        return (
            <View>
                <Text>Welcome to User detail screen</Text>
            </View>
        )
    }
}
