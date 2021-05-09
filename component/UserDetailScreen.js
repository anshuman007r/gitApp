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
            userDetail : {},
            repoList :[],
            gistList: []
        }
    }

    componentDidMount(){
        // this.callUserAPI()
        // this.callRepoListAPI()
        // this.callGistListAPI()
    }

    callUserAPI = () =>{
        const { user } = this.state
        callAPI('userDetail',user).then((res)=>{
            this.setState({
                userDetail :res
            },()=>console.log(this.state.userDetail))
        })
    }

    callRepoListAPI = () =>{
        const { user } = this.state
        callAPI('repoList',user).then((res)=>{
            this.setState({
                repoList :res
            },()=>console.log(this.state.repoList))
        })
    }

    callGistListAPI = () =>{
        const { user } = this.state
        callAPI('gistList',user).then((res)=>{
            this.setState({
                gistList :res
            },()=>console.log(this.state.gistList))
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
