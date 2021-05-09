import React, { Component } from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { callAPI } from '../config/Utility'

export default class UserListingScreen extends Component {
    state={
        userList : [],
        searchInput :'',
    }

    componentDidMount(){
        this.callListAPI()
    }

    callListAPI = () =>{
        callAPI('userList',{}).then((res)=>{
            this.setState({
                userList :res
            },()=>console.log(this.state.userList))
        })
    }

    callSearchAPI = () =>{
        const searchInput = 'mojombo'
        callAPI('search',searchInput).then((res)=>{
            this.setState({
                userList :res.items
            },()=>console.log(this.state.userList))
        })

    }
 
    render() {
        return (
            <View>
                <Text onPress={this.callSearchAPI}>User Listing screen</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserDetailScreen',{user : 'mojombo'})}>
                    <Text> Navigate to user Detail screen</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
