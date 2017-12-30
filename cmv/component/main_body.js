import React , {Component} from 'react'; 

import {Alert,Text, View,StyleSheet,ScrollView,AsyncStorage} from 'react-native';

import {List, ListItem ,Button,Icon} from 'react-native-elements';




export default class MainBody extends Component{
    
 
    constructor(props){
        super(...arguments); 
        
        this.state = {
            posts  : []
        }
    }
 

     
    static navigationOptions = ({ navigation }) => ({
        title: 'Change My View',
        headerRight :  <Button  icon={{name: 'user-circle-o', type: 'font-awesome'}}  title='Login To Reddit' onPress = { ()=>navigation.navigate('LoginPage') }/>
    });
          
    

    componentDidMount(){
        
        AsyncStorage
            .getItem('profile').then(response=>{
                console.log(response);
            });
        
        
        fetch('https://www.reddit.com/r/changemyview/.json')
            .then(response => response.json() )
            .then(response=>{
                let posts = response.data.children; 
                
                this.setState({posts : posts});
            })
    }
    
    _on_click(item){
        Alert.alert('You tapped the button!');
    }
        
    render(){
        
        const {navigate} = this.props.navigation; 

        
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
                <ScrollView>
                    <List>
                      {
                        this.state.posts.map((item, i) => (
                          <ListItem
                            key={i}
                            title={item.data.title}
                            titleNumberOfLines = {3}
                            onPress = {()=>navigate('Comment', {comment_id : item.data.id }) }
                          />
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
        top : 500, 
        left : 300,
        zIndex : 1000
    }
})