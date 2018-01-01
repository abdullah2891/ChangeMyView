import React , {Component} from 'react'; 

import {Alert,Text, View,StyleSheet,ScrollView,AsyncStorage, TouchableOpacity,Dimensions,ActivityIndicator } from 'react-native';

import {List, ListItem ,Button,Icon} from 'react-native-elements';


import ActionButton from './action_button';

export default class MainBody extends Component{
    
 
    constructor(props){
        super(...arguments); 
        
        this.state = {
            posts  : [], 
            isLoading : true
        }
    }
 

     
    static navigationOptions = ({ navigation }) => ({
        title: 'Change My View',
        headerRight :  <Button style={{marginTop :5 }} icon={{name: 'user-circle-o', type: 'font-awesome'}}  title='Login To Reddit' onPress = { ()=>navigation.navigate('LoginPage') }/>
    });
          
    

    componentDidMount(){
        
        AsyncStorage
            .getItem('profile').then(response=>{
                console.log(response);
            });
        
        this.setState({isLoading : true}); 
        
        fetch('https://www.reddit.com/r/changemyview/.json')
            .then(response => response.json() )
            .then(response=>{
                let posts = response.data.children; 
                
                this.setState({posts : posts});
                this.setState({isLoading : false});

                
            });
            
    }
    
    _on_click(item){
        Alert.alert('You tapped the button!');
    }
        
    render(){
        
        const {navigate} = this.props.navigation; 
        const fontSize =  9;
        console.log( Dimensions.get('window') );
        return(
            <View>
            
                <View style={styles.edit_page}>
                   <Icon
                      reverse
                      name='ios-add-outline'
                      type='ionicon'
                      color = '#0077ff'
                    onPress = {()=>navigate('WritePost') }

                    />
                </View>
                
                
                {
                    this.state.isLoading && 
                    <View style={styles.loading_screen}>
                        <ActivityIndicator size="large" color="#0000ff"  />
                        <Text>Loading posts</Text>
                    </View>    
                }
                
                
                
                <ScrollView>
                    <List>
                      {
                        this.state.posts.map((item, i) => (
                        <TouchableOpacity 
                            onPress = {()=>navigate('Comment', {comment_id : item.data.id }) }
                            style = {styles.card_style}
                        
                        > 
                            <Text
                                
                                key = {i}
                                style = {{fontSize : 20 }}
                            >
                                    {item.data.title} -{item.data.author}
                                
                            </Text>
                            
                            <ActionButton item={item}/>
                        
                        
                        </TouchableOpacity >
                          
                          
                        ))
                      }
                    </List>
                </ScrollView>
            
                 
            </View>    
            
            );
    }
}


const styles= StyleSheet.create({
    edit_page :{
        position :  'absolute', 
        top : Dimensions.get('window').height - 200, 
        left : Dimensions.get('window').width - 80, 
        zIndex : 1000
    }, 
    card_style : {
        borderLeftWidth: 7,
        borderLeftColor : '#7a0315',

        borderTopWidth : 1 ,
        
        
        borderRadius : 10, 
        
        marginLeft  : 5, 
        marginRight : 5, 

        padding : 5
        
    },
    
    loading_screen : {
        position : 'absolute',
        top : Dimensions.get('window').height /2 , 
        left : Dimensions.get('window').width /3, 
        zIndex : 1000
    }
    

    
    
})