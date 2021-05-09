import React, { Component } from 'react'
import { callAPI } from '../config/Utility'
import { Container, Content, Icon, Header, Left, Body, Right } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking, FlatList } from 'react-native';
import styles from '../style';
import profile from '../assets/images/profile.png'
import { widthPercentageToDP, heightPercentageToDP } from '../const'
import SearchIcon from '../assets/images/search.png'

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
        this.callUserAPI()
        this.callRepoListAPI()
        this.callGistListAPI()
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

    _renderRepoList = (rowItem) => {
        const {item, index}  = rowItem;
        return (
            <View style={styles.image_container}>
                <View style={{flexDirection: 'row'}}>
                    <View style ={{flex : 2.8}}>
                        <Text style={{ color: '#000', fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Name : </Text>{item.name}</Text>
                        <View style={{flexDirection:'row',marginTop:3, justifyContent :'space-between'}}>
                            <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={1}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Size : </Text>{item.size}</Text>
                            <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={2}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Watcher count : </Text>{item.watchers_count}</Text>
                        </View>
                        <Text style={{ color: '#000', marginTop:3, fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>repo url : </Text>{item.url}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _renderGistList = (rowItem) => {
        const {item, index}  = rowItem;
        return (
            <View style={styles.image_container}>
                <View style={{flexDirection: 'row'}}>
                    <View style ={{flex : 2.8}}>
                        <Text style={{ color: '#000', fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Node id : </Text>{item.node_id}</Text>
                        <View style={{flexDirection:'row',marginTop:3, justifyContent :'space-between'}}>
                            <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={1}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Id : </Text>{item.id}</Text>
                            <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',}} numberOfLines={2}><Text style={{fontFamily : 'WorkSans-SemiBold'}}> Created at : </Text>{item.created_at? item.created_at.split('T')[0] : ''}</Text>
                        </View>
                        <Text style={{ color: '#000', marginTop:3, fontFamily: 'WorkSans-Regular',fontSize: 14, alignSelf: 'flex-start', }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>gist url : </Text>{item.url}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container>
                <View style ={{backgroundColor :'#c3c3c3', height :50,flexDirection :'row',alignItems:'center'}}>
                    <Text style={{left :15, fontSize :28,flex:1}} onPress={()=>this.props.navigation.goBack()}>X</Text>
                    <Text style={styles.chat_header}>User detail screen</Text>
                </View>
                    <Content>
                        <View style={styles.homepage_wrapper}>
                            {this.state.userDetail && this.state.userDetail.avatar_url &&
                                <View style={styles.signup_imageView}>
                                    <Image source={{uri : this.state.userDetail.avatar_url}} style={styles.signup_image_path} />
                                </View> 
                            }
                        </View>
                        <View style={[styles.homepage_wrapper, {marginBottom :20}]}>
                            {this.state.userDetail && this.state.userDetail.avatar_url &&
                            <View style={{ flex : 1, alignItems :'center'}}>
                                <Text style={{ color: '#000', fontFamily: 'WorkSans-Regular',fontSize: 14,}} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Username : </Text>{this.state.userDetail.login}</Text>
                                <Text style={{ color: '#000', fontSize:14,flex :1.2, fontFamily: 'WorkSans-Regular',marginTop : 3}} numberOfLines={1}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Type : </Text>{this.state.userDetail.type}</Text>
                                <Text style={{ color: '#000', marginTop:3, fontFamily: 'WorkSans-Regular',fontSize: 14 }} numberOfLines ={1} ellipsizeMode={'tail'}><Text style={{fontFamily : 'WorkSans-SemiBold'}}>Git url : </Text>{this.state.userDetail.url}</Text>
                            </View>
                            }
                        </View>
                        {
                            this.state.repoList && this.state.repoList.length > 0 &&
                            <View style={{flex : 1, marginHorizontal :10, marginVertical : 20}}>
                                <Text style={[styles.chat_header,{marginBottom :20, fontSize :20, fontFamily :'WorkSans-Bold'}]}> Repo List :</Text>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.repoList}
                                    extraData={this.state}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this._renderRepoList}
                                    style={{marginBottom:20}}
                                />
                            </View>
                        }
                        {
                            this.state.gistList && this.state.gistList.length > 0 &&
                            <View style={{flex : 1, marginHorizontal :10, marginVertical : 20}}>
                                <Text style={[styles.chat_header,{marginBottom :20, fontSize :20,fontFamily :'WorkSans-Bold'}]}> Gist List :</Text>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.gistList}
                                    extraData={this.state}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this._renderGistList}
                                    style={{marginBottom:20}}
                                />
                            </View>
                        }

                    </Content>
            </Container>
        )
    }
}
