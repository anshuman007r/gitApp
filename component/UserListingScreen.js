import React, { Component } from 'react'
import { callAPI } from '../config/Utility'
import { Container, Content, Icon, Header, Left, Body, Right } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking, FlatList } from 'react-native';
import styles from '../style';
import profile from '../assets/images/profile.png'
import { widthPercentageToDP, heightPercentageToDP } from '../const'
import SearchIcon from '../assets/images/search.png'
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

    _renderUserList = (rowItem) => {
        const {item, index}  = rowItem;
        console.log(item)
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserDetailScreen',{user : item.login})} style={{backgroundColor:'#d4d4d4', width :'90%', alignSelf:'center',borderColor:'grey',borderWidth:1,borderRadius:10,paddingHorizontal :10, paddingVertical : 10,  marginTop :10,justifyContent :'center', flexDirection: "row"}} key={index}>
                <View style ={{flex : 1.2, alignItems :'center', justifyContent :'center'}}>
                    {
                        item.avatar_url ?
                        <Image source={{ uri : item.avatar_url }} style={{height : 75, width : 70}}/>:
                        <Image source={profile} style={{height : 75, width : 70}}/>
                    }
                </View>
                <View style ={{flex : 2.8}}>
                    <Text style={{ color: '#000', fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Username : </Text>{item.login}</Text>
                    <View style={{marginTop:3, justifyContent :'space-between'}}>
                        <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={1}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Type : </Text>{item.type}</Text>
                    </View>
                    <Text style={{ color: '#000', marginTop:3, fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Git url : </Text>{item.url}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    callSearchAPI = () =>{
        const { searchInput } = this.state
        callAPI('search',searchInput).then((res)=>{
            this.setState({
                userList :res.items
            },()=>console.log(this.state.userList))
        })

    }

    onTextChange = (text) =>{
        if( text != ''){
            this.setState({
                searchInput : text
            },()=>this.callSearchAPI())
        }else{
            this.setState({
                searchInput : ''
            },()=>this.callListAPI())        
        }
    }
 
    render() {
        return (
            <Container>
                    <Header style={{backgroundColor:'#c3c3c3'}} iosBarStyle={"dark-content"} androidStatusBarColor={"#f3f3f3"} >
                        <Left style={{ flex: 0.1,paddingLeft: widthPercentageToDP(3) }} disable>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <View
                            style={styles.searchPlaceHolder}>
                                <TextInput style={styles.searchplaceholderHeight} placeholder={"Search here"} onChangeText={(value) => this.onTextChange(value)} value={this.state.searchInput}
                                selectionColor='#000'
                                    onSubmitEditing={() => this.callSearchAPI()}
                                />
                            </View>
                        </Body>
                        <Right onPress={() => { this.callSearchAPI() }} style={{ flex: 0.1,paddingRight: widthPercentageToDP(2) }}>
                            <TouchableOpacity onPress={() => { this.callSearchAPI() }}>
                            <Image source={SearchIcon} style={{ height: 15, width: 15, position: "relative",fontSize:16}} />
                            </TouchableOpacity>
                        </Right>
                        </Header>
                    <Content>
                        <FlatList
                            data={this.state.userList}
                            extraData={this.state}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderUserList}
                            style={{marginBottom:20}}
                        />
                    </Content>
            </Container>
        )
    }
}
